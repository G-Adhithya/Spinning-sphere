import * as Three from "three";
import "./style.css"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import gsap from "gsap" 

const lol = document.querySelector(".lol")
lol.addEventListener("click", () => {
  alert("It doesn't work, don't try.")
})

const lol2 = document.querySelector(".lol2")
lol2.addEventListener("click", () => {
  alert("It doesn't work, don't try.")
})

// This creates the scene for the app 
const scene = new Three.Scene();

// The shape of the 3d object is specified in the geometry of the app
const geometry = new Three.SphereGeometry(4, 64, 64);

// The color of the 3D object is specified in the material
const material = new Three.MeshStandardMaterial({
  color: "#ff5968"
});

const mesh = new Three.Mesh(geometry, material);
scene.add(mesh);

const sizes = {
  width: window.innerWidth, 
  height: window.innerHeight
}

// This function helps in adding the camera
const camera = new Three.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 20
scene.add(camera)

const canvas = document.querySelector(".canvas")

// Adds light to the scene
const light = new Three.PointLight(0xfffffff, 1, 100)
light.position.set(0, 10, 10)
scene.add(light)

// Orbital controls
const controller = new OrbitControls(camera, canvas)
controller.enableDamping = true
controller.autoRotate = true
controller.autoRotateSpeed = 3
controller.enablePan = false
controller.enableZoom = false

// This is a WebGLRenderer
const renderer = new Three.WebGLRenderer({canvas: canvas})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)
renderer.setPixelRatio(2)

// Check everytime resizing and resize accordingly
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
})

const loop = () => {
  controller.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)
}

loop()


// Timeline
const timeline = new gsap.timeline({ defaults: { duration: 2 } })
timeline.fromTo(mesh.scale, {x: 0, y: 0, z: 0}, {x: 1, y: 1, z: 1})
timeline.fromTo("nav", { y: "-100%" }, { y: "0%" })
timeline.fromTo(".important", { opacity: 0 }, { opacity: 1 })

let ismouseDown = false
let rgb = []

window.addEventListener("mousedown", () => (ismouseDown = true))
window.addEventListener("mouseup", () => (ismouseDown = false))

window.addEventListener("mousemove", (e) => {
 
  if (ismouseDown) {
    rgb = [
    Math.round((e.pageX / sizes.width) * 255), 
    Math.round((e.pageY / sizes.height) * 255),
    150
  ]

  let color = new Three.Color(`rgb(${rgb.join(",")})`)
  console.log(color)
  gsap.to(mesh.material.color, { r: color.r, g: color.g, b: color.b })
  }
})