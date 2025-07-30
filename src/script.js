import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Scene
const scene = new THREE.Scene()

// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0x18B533 })
)
scene.add(mesh)

// Camera
/*
    - Shouldn't access directly
        - There are camera classes that inherit from the Camera class (better approach)

    Classes that Inherit from Camera

        - Array Camera
            -> Renders scene multiple times
            -> Good for multiple cameras in scene
            -> Think Split screen effects?

        - Stereo Camera
            -> Render scene through 2 cameras
                * Simulate eyes
                * Parallax effect
                * Simulates to brain there is depth
                * Needs VR or blue/red glasses
        
        - Cube Camera
            -> Get a render in every direction (of a cube)
                * Create render of surroundings
            -> Environment map for reflection
            -> Shadow map

        - Orthographic Camera
            -> An objects size in the rendered image stays constant 
                * Regardless of  distance from camera?

        - Perspective Camera
            -> Real-life camera with perspective

        -------------------------------------------------------------
        Controls

        - Fly Controls
            -> Spaceship type shii

        - First Person Control
            -> Birds Eye view type

        - Pointer Lock Controls
            -> FPS
            -> Cursor stuck in the middle of screen
            -> Still have to account for physics and camera position

        - Orbit Controls
            -> Rotate around a point with left mouse
            -> Translate laterally with right mouse
            -> Zoom in/out with scroll

        - Trackball Controls
            -> Like orbit controls without vertical angle limits

        - Transform Controls
            -> Nothing to do with Camera
            -> Used to add a gizmo to object 
                * to move object

        - Drag Controls
            -> Nothing with camera
            -> Allows you to drag and drop items
*/
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 1000 )
// uses canvas ratio to affect camera
// const aspectRatio = sizes.width / sizes.height
// const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 100)
// camera.position.x = 2
// camera.position.y = 2
camera.position.z = 3
camera.lookAt(mesh.position)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas) // drag and drop to get rotations 
// controls.target.y = 2
// controls.update()
controls.enableDamping = true // Smoothens out animation - needs controls.update()


// Cursor
// Cursor variable
const cursor =
{
    x: 0,
    y: 0
}

/*
    Goal is to get the camera to move with the mouse
    -> Below flag is going to return the coordinates 
*/
window.addEventListener('mousemove', (event) =>
{
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = - (event.clientY / sizes.height - 0.5) // inverted so that it moves properly

    console.log(cursor.x, cursor.y)
})

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)


// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // // Update objects
    // mesh.rotation.y = elapsedTime;

    // Update Camera
    // camera.position.x = cursor.x * 3
    // camera.position.y = cursor.y * 3
    /* 
        - Pi * 2 is 1 circle
        - sin and cos allow us to put things on a circle
    // */ 
    // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2
    // camera.position.y = cursor.y * 3
    // camera.lookAt(mesh.position)
    
    // Update Controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()