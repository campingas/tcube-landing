import {
  ACESFilmicToneMapping,
  AmbientLight,
  CanvasTexture,
  Color,
  CylinderGeometry,
  DirectionalLight,
  DoubleSide,
  Group,
  Mesh,
  MeshPhysicalMaterial,
  Object3D,
  PCFSoftShadowMap,
  PerspectiveCamera,
  PointLight,
  Raycaster,
  Scene,
  SRGBColorSpace,
  Vector2,
  Vector3,
  WebGLRenderer,
} from 'three'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'

import { qs } from '@/utils/dom'

interface FaceSpec {
  button: Color
  name: 'front' | 'right' | 'top' | 'back' | 'left'
  position: Vector3
  rotation: Vector3
}

const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const CUBE_SIZE = 2.1
const HALF = CUBE_SIZE / 2

const faceSpecs: FaceSpec[] = [
  {
    button: new Color('#c55347'),
    name: 'front',
    position: new Vector3(0, 0, HALF + 0.01),
    rotation: new Vector3(0, 0, 0),
  },
  {
    button: new Color('#00908a'),
    name: 'right',
    position: new Vector3(HALF + 0.01, 0, 0),
    rotation: new Vector3(0, Math.PI / 2, 0),
  },
  {
    button: new Color('#bc892b'),
    name: 'top',
    position: new Vector3(0, HALF + 0.01, 0),
    rotation: new Vector3(-Math.PI / 2, 0, 0),
  },
  {
    button: new Color('#66629c'),
    name: 'back',
    position: new Vector3(0, 0, -HALF - 0.01),
    rotation: new Vector3(0, Math.PI, 0),
  },
  {
    button: new Color('#648f7b'),
    name: 'left',
    position: new Vector3(-HALF - 0.01, 0, 0),
    rotation: new Vector3(0, -Math.PI / 2, 0),
  },
]

function createTexture(): CanvasTexture {
  const size = 256
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size

  const context = canvas.getContext('2d')
  if (context === null) {
    throw new Error('Could not create canvas context for cube texture')
  }

  const gradient = context.createLinearGradient(0, 0, size, size)
  gradient.addColorStop(0, '#25282a')
  gradient.addColorStop(0.48, '#111314')
  gradient.addColorStop(1, '#050607')
  context.fillStyle = gradient
  context.fillRect(0, 0, size, size)

  context.globalAlpha = 0.16
  for (let i = 0; i < 520; i += 1) {
    const x = Math.random() * size
    const y = Math.random() * size
    const value = String(Math.round(110 + Math.random() * 90))
    context.fillStyle = `rgb(${value} ${value} ${value})`
    context.fillRect(x, y, 1, 1)
  }

  context.globalAlpha = 0.12
  context.strokeStyle = '#ffffff'
  for (let line = -size; line < size * 2; line += 14) {
    context.beginPath()
    context.moveTo(line, 0)
    context.lineTo(line + size, size)
    context.stroke()
  }

  const texture = new CanvasTexture(canvas)
  texture.colorSpace = SRGBColorSpace

  return texture
}

function roundedBox(): Group {
  const group = new Group()
  const texture = createTexture()
  const faceMaterial = new MeshPhysicalMaterial({
    clearcoat: 0.42,
    clearcoatRoughness: 0.5,
    color: '#111314',
    map: texture,
    metalness: 0.04,
    roughness: 0.68,
  })

  const core = new Mesh(
    new RoundedBoxGeometry(CUBE_SIZE, CUBE_SIZE, CUBE_SIZE, 7, 0.18),
    faceMaterial,
  )
  core.name = 'rounded-tcube-body'
  core.castShadow = true
  core.receiveShadow = true
  group.add(core)

  return group
}

function createButton(spec: FaceSpec): Group {
  const group = new Group()
  group.position.copy(spec.position)
  group.rotation.set(spec.rotation.x, spec.rotation.y, spec.rotation.z)

  const buttonMaterial = new MeshPhysicalMaterial({
    clearcoat: 1,
    clearcoatRoughness: 0.18,
    color: spec.button,
    emissive: spec.button,
    emissiveIntensity: 1.25,
    metalness: 0,
    roughness: 0.2,
    transmission: 0.08,
  })

  const haloMaterial = new MeshPhysicalMaterial({
    color: spec.button,
    emissive: spec.button,
    emissiveIntensity: 2.7,
    opacity: 0.2,
    roughness: 0.65,
    side: DoubleSide,
    transparent: true,
  })

  const button = new Mesh(
    new CylinderGeometry(0.32, 0.38, 0.14, 64),
    buttonMaterial,
  )
  button.rotation.x = Math.PI / 2
  button.position.z = 0.09
  button.castShadow = true
  button.receiveShadow = true

  const halo = new Mesh(
    new CylinderGeometry(0.54, 0.6, 0.025, 64),
    haloMaterial,
  )
  halo.rotation.x = Math.PI / 2
  halo.position.z = 0.03

  const light = new PointLight(spec.button, 1.6, 4.5, 2.1)
  light.position.set(0, 0, 0.42)

  group.add(halo, button, light)

  return group
}

function createScene(cube: Object3D): Scene {
  const scene = new Scene()
  scene.background = null

  const ambient = new AmbientLight('#f5ecc2', 1.8)
  const key = new DirectionalLight('#ffffff', 5.2)
  key.position.set(3.4, 4.6, 5.2)
  key.castShadow = true

  const rim = new DirectionalLight('#00908a', 2.1)
  rim.position.set(-4.5, 1.2, -3.5)

  const warm = new PointLight('#c55347', 1.4, 6, 2)
  warm.position.set(-2.4, -1.2, 3.2)

  scene.add(ambient, key, rim, warm, cube)

  return scene
}

function createRenderer(canvas: HTMLCanvasElement): WebGLRenderer {
  const renderer = new WebGLRenderer({
    alpha: true,
    antialias: true,
    canvas,
    powerPreference: 'high-performance',
    preserveDrawingBuffer: true,
  })
  renderer.outputColorSpace = SRGBColorSpace
  renderer.toneMapping = ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.12
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = PCFSoftShadowMap

  return renderer
}

export function initHeroCube(): void {
  const canvas = qs<HTMLCanvasElement>('#hero-cube-canvas')
  const container = qs<HTMLElement>('#hero-cube-scene')

  const renderer = createRenderer(canvas)
  const camera = new PerspectiveCamera(34, 1, 0.1, 100)
  camera.position.set(0, 0, 7)

  const cube = roundedBox()
  cube.rotation.set(0.35, -0.55, 0.08)
  for (const spec of faceSpecs) {
    cube.add(createButton(spec))
  }

  const scene = createScene(cube)
  const raycaster = new Raycaster()
  const pointer = new Vector2()
  const target = new Vector2(cube.rotation.y, cube.rotation.x)
  const velocity = new Vector2(0.003, 0)
  const dragging = { active: false, x: 0, y: 0 }

  const resize = (): void => {
    const { width, height } = container.getBoundingClientRect()
    const pixelRatio = Math.min(window.devicePixelRatio, 2)
    renderer.setPixelRatio(pixelRatio)
    renderer.setSize(width, height, false)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
  }

  const toPointer = (event: PointerEvent): Vector2 => {
    const rect = canvas.getBoundingClientRect()
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    pointer.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1)

    return pointer
  }

  const isCubeHit = (event: PointerEvent): boolean => {
    raycaster.setFromCamera(toPointer(event), camera)
    return raycaster.intersectObject(cube, true).length > 0
  }

  canvas.addEventListener('pointerdown', (event) => {
    if (!isCubeHit(event)) {
      return
    }

    dragging.active = true
    dragging.x = event.clientX
    dragging.y = event.clientY
    canvas.setPointerCapture(event.pointerId)
  })

  canvas.addEventListener('pointermove', (event) => {
    if (!dragging.active) {
      return
    }

    const dx = event.clientX - dragging.x
    const dy = event.clientY - dragging.y
    dragging.x = event.clientX
    dragging.y = event.clientY

    target.x += dx * 0.008
    target.y += dy * 0.008
    velocity.set(dx * 0.0005, dy * 0.0005)
  })

  canvas.addEventListener('pointerup', (event) => {
    dragging.active = false
    if (canvas.hasPointerCapture(event.pointerId)) {
      canvas.releasePointerCapture(event.pointerId)
    }
  })

  window.addEventListener('resize', resize)
  resize()

  renderer.setAnimationLoop(() => {
    if (!REDUCED && !dragging.active) {
      target.x += velocity.x
      target.y += Math.sin(performance.now() * 0.0009) * 0.0006
      velocity.multiplyScalar(0.992)
      velocity.x += 0.000012
    }

    cube.rotation.y += (target.x - cube.rotation.y) * 0.08
    cube.rotation.x += (target.y - cube.rotation.x) * 0.08
    cube.rotation.z = Math.sin(performance.now() * 0.0007) * 0.045

    renderer.render(scene, camera)
  })
}
