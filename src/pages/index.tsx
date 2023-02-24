import { useEffect } from "react"
import * as THREE from "three"
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  let canvas: HTMLElement
  useEffect(() => {
    if (canvas) return

    canvas = document.getElementById('canvas')!

    const scene = new THREE.Scene()

    const sizes = {
      width: 240,
      height: 240
    }

    const camera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      1000
    )

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas || undefined,
      antialias: true,
      alpha: true
    })
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(window.devicePixelRatio)

    const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
    const boxMaterial = new THREE.MeshLambertMaterial({
      color: '#2497f0'
    })
    const box = new THREE.Mesh(boxGeometry, boxMaterial)
    box.position.z = -5
    box.rotation.set(10, 10, 10)
    scene.add(box)

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
    scene.add(ambientLight)
    const pointLight = new THREE.PointLight(0xffffff, 0.2)
    pointLight.position.set(1, 2, 3)
    scene.add(pointLight)

    const clock = new THREE.Clock()
    const tick = () => {
      const elapsedTime = clock.getElapsedTime()
      box.rotation.x = elapsedTime
      box.rotation.y = elapsedTime
      window.requestAnimationFrame(tick)
      renderer.render(scene, camera)
    }
    tick()

    window.addEventListener('resize', () => {
      sizes.width = window.innerWidth
      sizes.height = window.innerHeight
      camera.aspect = sizes.width / sizes.height
      camera.updateProjectionMatrix()
      renderer.setSize(sizes.width, sizes.height)
      renderer.setPixelRatio(window.devicePixelRatio)
    })
  }, [])
  return (
    <>
      <Head>
        <title></title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="" />
      </Head>
      <main>
        <h1></h1>
        <h2></h2>
        {/* <canvas></canvas> */}
        <div>
          <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </main>
      <div>
        <canvas id="canvas"></canvas>
        <div>
          <div></div>
          <ul>
            <li></li>
            <li></li>
          </ul>
        </div>
        <div>
          <ul>
            <li>menu1</li>
            <li>menu2</li>
            <li>menu3</li>
            <li>menu4</li>
            <li>menu5</li>
          </ul>
        </div>
      </div>
    </>
  )
}
