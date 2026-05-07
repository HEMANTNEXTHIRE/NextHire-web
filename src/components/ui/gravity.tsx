'use client'

import {
  createContext,
  forwardRef,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { debounce } from 'lodash'
import Matter, {
  Bodies,
  Common,
  Engine,
  Events,
  Mouse,
  MouseConstraint,
  Query,
  Render,
  Runner,
  World,
} from 'matter-js'

/* ── helpers ─────────────────────────────────────────────────── */
function calculatePosition(
  value: number | string | undefined,
  containerSize: number,
  elementSize: number
) {
  if (typeof value === 'string' && value.endsWith('%')) {
    return containerSize * (parseFloat(value) / 100)
  }
  return typeof value === 'number'
    ? value
    : elementSize - containerSize + elementSize / 2
}

/* ── types ───────────────────────────────────────────────────── */
export type GravityRef = { start: () => void; stop: () => void; reset: () => void }

type MatterBodyProps = {
  children: ReactNode
  matterBodyOptions?: Matter.IBodyDefinition
  isDraggable?: boolean
  bodyType?: 'rectangle' | 'circle'
  x?: number | string
  y?: number | string
  angle?: number
  className?: string
  style?: React.CSSProperties
}

type PhysicsBody = {
  element: HTMLElement
  body: Matter.Body
  props: MatterBodyProps
}

type GravityProps = {
  children: ReactNode
  debug?: boolean
  gravity?: { x: number; y: number }
  resetOnResize?: boolean
  grabCursor?: boolean
  addTopWall?: boolean
  autoStart?: boolean
  className?: string
  style?: React.CSSProperties
}

/* ── context ─────────────────────────────────────────────────── */
const GravityContext = createContext<{
  registerElement: (id: string, element: HTMLElement, props: MatterBodyProps) => void
  unregisterElement: (id: string) => void
} | null>(null)

/* ── MatterBody ──────────────────────────────────────────────── */
export const MatterBody = ({
  children,
  className,
  style,
  matterBodyOptions = { friction: 0.1, restitution: 0.1, density: 0.001 },
  bodyType = 'rectangle',
  isDraggable = true,
  x = 0,
  y = 0,
  angle = 0,
  ...props
}: MatterBodyProps) => {
  const elementRef = useRef<HTMLDivElement>(null)
  const idRef = useRef(Math.random().toString(36).substring(7))
  const ctx = useContext(GravityContext)

  useEffect(() => {
    if (!elementRef.current || !ctx) return
    ctx.registerElement(idRef.current, elementRef.current, {
      children, matterBodyOptions, bodyType, isDraggable, x, y, angle, ...props,
    })
    return () => ctx.unregisterElement(idRef.current)
  }, []) // eslint-disable-line

  return (
    <div
      ref={elementRef}
      className={className}
      style={{
        position: 'absolute',
        ...(isDraggable ? { pointerEvents: 'none' } : {}),
        ...style,
      }}
    >
      {children}
    </div>
  )
}

/* ── Gravity ─────────────────────────────────────────────────── */
export const Gravity = forwardRef<GravityRef, GravityProps>(
  (
    {
      children,
      debug = false,
      gravity = { x: 0, y: 1 },
      grabCursor = true,
      resetOnResize = true,
      addTopWall = false,
      autoStart = true,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const canvas = useRef<HTMLDivElement>(null)
    const engine = useRef(Engine.create())
    const render = useRef<Render>()
    const runner = useRef<Runner>()
    const bodiesMap = useRef(new Map<string, PhysicsBody>())
    const frameId = useRef<number>()
    const mouseConstraint = useRef<Matter.MouseConstraint>()
    const mouseDown = useRef(false)
    const isRunning = useRef(false)
    const [, setCanvasSize] = useState({ width: 0, height: 0 })

    const registerElement = useCallback(
      (id: string, element: HTMLElement, bprops: MatterBodyProps) => {
        if (!canvas.current) return
        const w = element.offsetWidth
        const h = element.offsetHeight
        const rect = canvas.current.getBoundingClientRect()
        const angleRad = ((bprops.angle ?? 0) * Math.PI) / 180
        const x = calculatePosition(bprops.x, rect.width, w)
        const y = calculatePosition(bprops.y, rect.height, h)

        let body: Matter.Body
        const renderOpts = { fillStyle: debug ? '#888' : '#0000', strokeStyle: debug ? '#333' : '#0000', lineWidth: debug ? 2 : 0 }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const opts: any = { ...(bprops.matterBodyOptions ?? {}), angle: angleRad, render: renderOpts }
        if (bprops.bodyType === 'circle') {
          body = Bodies.circle(x, y, Math.max(w, h) / 2, opts)
        } else {
          body = Bodies.rectangle(x, y, w, h, opts)
        }

        World.add(engine.current.world, [body])
        bodiesMap.current.set(id, { element, body, props: bprops })
      },
      [debug]
    )

    const unregisterElement = useCallback((id: string) => {
      const entry = bodiesMap.current.get(id)
      if (entry) {
        World.remove(engine.current.world, entry.body)
        bodiesMap.current.delete(id)
      }
    }, [])

    const updateElements = useCallback(() => {
      bodiesMap.current.forEach(({ element, body }) => {
        const { x, y } = body.position
        const deg = body.angle * (180 / Math.PI)
        element.style.transform = `translate(${x - element.offsetWidth / 2}px, ${y - element.offsetHeight / 2}px) rotate(${deg}deg)`
      })
      frameId.current = requestAnimationFrame(updateElements)
    }, [])

    const initializeRenderer = useCallback(() => {
      if (!canvas.current) return
      const width = canvas.current.offsetWidth
      const height = canvas.current.offsetHeight

      try { Common.setDecomp(require('poly-decomp')) } catch (_) {}

      engine.current.gravity.x = gravity.x
      engine.current.gravity.y = gravity.y

      render.current = Render.create({
        element: canvas.current,
        engine: engine.current,
        options: { width, height, wireframes: false, background: '#00000000' },
      })

      const mouse = Mouse.create(render.current.canvas)
      // Remove wheel listeners added by matter-js so page scroll is not blocked
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mw = (mouse as any).mousewheel
      if (mw && render.current.canvas) {
        render.current.canvas.removeEventListener('wheel', mw)
        render.current.canvas.removeEventListener('mousewheel', mw)
        render.current.canvas.removeEventListener('DOMMouseScroll', mw)
      }

      mouseConstraint.current = MouseConstraint.create(engine.current, {
        mouse,
        constraint: { stiffness: 0.2, render: { visible: debug } },
      })

      const walls = [
        Bodies.rectangle(width / 2, height + 10, width, 20, { isStatic: true, friction: 1, render: { visible: debug } }),
        Bodies.rectangle(width + 10, height / 2, 20, height, { isStatic: true, friction: 1, render: { visible: debug } }),
        Bodies.rectangle(-10, height / 2, 20, height, { isStatic: true, friction: 1, render: { visible: debug } }),
      ]
      if (addTopWall) {
        walls.push(Bodies.rectangle(width / 2, -10, width, 20, { isStatic: true, friction: 1, render: { visible: debug } }))
      }

      if (grabCursor) {
        const touching = () =>
          Query.point(engine.current.world.bodies, mouseConstraint.current?.mouse.position ?? { x: 0, y: 0 }).length > 0

        Events.on(engine.current, 'beforeUpdate', () => {
          if (!canvas.current) return
          canvas.current.style.cursor = !mouseDown.current && !touching() ? 'default' : touching() ? (mouseDown.current ? 'grabbing' : 'grab') : 'default'
        })
        canvas.current.addEventListener('mousedown', () => { mouseDown.current = true })
        canvas.current.addEventListener('mouseup', () => { mouseDown.current = false })
      }

      World.add(engine.current.world, [mouseConstraint.current, ...walls])
      render.current.mouse = mouse
      runner.current = Runner.create()
      Render.run(render.current)
      updateElements()

      if (autoStart) {
        runner.current.enabled = true
        Runner.run(runner.current, engine.current)
      }
    }, [updateElements, debug, autoStart, gravity, grabCursor, addTopWall])

    const clearRenderer = useCallback(() => {
      if (frameId.current) cancelAnimationFrame(frameId.current)
      if (mouseConstraint.current) World.remove(engine.current.world, mouseConstraint.current)
      if (render.current) {
        Mouse.clearSourceEvents(render.current.mouse)
        Render.stop(render.current)
        render.current.canvas.remove()
      }
      if (runner.current) Runner.stop(runner.current)
      World.clear(engine.current.world, false)
      Engine.clear(engine.current)
      bodiesMap.current.clear()
    }, [])

    const startEngine = useCallback(() => {
      if (!runner.current) return
      runner.current.enabled = true
      Runner.run(runner.current, engine.current)
      if (render.current) Render.run(render.current)
      frameId.current = requestAnimationFrame(updateElements)
      isRunning.current = true
    }, [updateElements])

    const stopEngine = useCallback(() => {
      if (!isRunning.current) return
      if (runner.current) Runner.stop(runner.current)
      if (render.current) Render.stop(render.current)
      if (frameId.current) cancelAnimationFrame(frameId.current)
      isRunning.current = false
    }, [])

    const reset = useCallback(() => {
      stopEngine()
      clearRenderer()
      initializeRenderer()
    }, [stopEngine, clearRenderer, initializeRenderer])

    useImperativeHandle(ref, () => ({ start: startEngine, stop: stopEngine, reset }), [startEngine, stopEngine, reset])

    useEffect(() => {
      if (!resetOnResize) return
      const onResize = debounce(() => {
        if (!canvas.current) return
        setCanvasSize({ width: canvas.current.offsetWidth, height: canvas.current.offsetHeight })
        clearRenderer()
        initializeRenderer()
      }, 500)
      window.addEventListener('resize', onResize)
      return () => { window.removeEventListener('resize', onResize); onResize.cancel() }
    }, [clearRenderer, initializeRenderer, resetOnResize])

    useEffect(() => {
      initializeRenderer()
      return clearRenderer
    }, []) // eslint-disable-line

    return (
      <GravityContext.Provider value={{ registerElement, unregisterElement }}>
        <div
          ref={canvas}
          className={className}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', ...style }}
          {...props}
        >
          {children}
        </div>
      </GravityContext.Provider>
    )
  }
)

Gravity.displayName = 'Gravity'
