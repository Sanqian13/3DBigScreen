import { AfterViewInit, Component, ComponentFactoryResolver, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as THREE from "three";

@Component({
  selector: 'app-china-map',
  templateUrl: './china-map.component.html',
  styleUrls: ['./china-map.component.less']
})
export class ChinaMapComponent implements OnInit, AfterViewInit {
  @ViewChild('box', { static: true }) box!: ElementRef;
  @ViewChild('provinceInfo', { static: true }) provinceInfo!: ElementRef;
  constructor() { }
  mapObj: any;
  tagData: Array<any> = [
    { "cityId": "110100", "cityName": "北京", "value": ["116.405289", "39.904987"], "projectCount": 3, "deviceCount": 1 },
    { "cityId": "441200", "cityName": "肇庆", "value": ["112.616609", "23.20106"], "projectCount": 14, "deviceCount": 107 },
    { "cityId": "460100", "cityName": "海口", "value": ["110.208472", "20.031379"], "projectCount": 3, "deviceCount": 20 },
    { "cityId": "440100", "cityName": "广州", "value": ["113.34669", "23.147482"], "projectCount": 4, "deviceCount": 50 },
    { "cityId": "440800", "cityName": "湛江", "value": ["110.420038", "21.193235"], "projectCount": 3, "deviceCount": 37 },
    { "cityId": "530700", "cityName": "丽江", "value": ["100.233025", "26.872108"], "projectCount": 1, "deviceCount": 0 },
    { "cityId": "445100", "cityName": "潮州", "value": ["116.592724", "23.488789"], "projectCount": 2, "deviceCount": 31 },
    { "cityId": "440600", "cityName": "佛山", "value": ["113.207172", "23.134999"], "projectCount": 3, "deviceCount": 34 }
  ]

  private width: number = 0;
  private height: number = 0;

  private renderer: any;
  private scene = new THREE.Scene();;
  private camera: any;
  private cube: any;
  // 盒子立方体
  private geometry = new THREE.BoxGeometry(1, 1, 1);
  private cubes = [
    this.makeInstance(this.geometry, 0x44aa88, 0),
    this.makeInstance(this.geometry, 0x8844aa, -2),
    this.makeInstance(this.geometry, 0xaa8844, 2),
  ];


  ngOnInit(): void {
  }

  ngAfterViewInit() {
    // this.initThree();
  }

  initThree() {
    this.width = this.box.nativeElement.offsetWidth;
    this.height = this.box.nativeElement.offsetHeight;

    console.log('=====this.box.nativeElement===', this.box.nativeElement)

    // 初始渲染器
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(this.width, this.height);
    this.renderer.shadowMap.enabled = true; // 开启阴影
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    // this.renderer.setClearColor(0xFFFFFF);

    //绑定DOM
    this.box.nativeElement.append(this.renderer.domElement);


    // 透视摄像机
    const fov = 75;
    const aspect = this.width / this.height;  // the canvas default
    const near = 0.1;
    const far = 5;
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this.camera.position.z = 4;

    this.camera.lookAt(this.scene.position);

    const light = new THREE.DirectionalLight(0xFFFFFF, 1);
    light.position.set(-1, 2, 4);
    this.scene.add(light);

    //渲染
    // this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.animate.bind(this));

  }

  resizeRendererToDisplaySize() {
    const canvas = this.renderer.domElement;
    const pixelRatio = window.devicePixelRatio;
    const width = canvas.clientWidth * pixelRatio | 0;
    const height = canvas.clientHeight * pixelRatio | 0;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      this.renderer.setSize(width, height, false);
    }
    console.log('==========need======', needResize)
    return needResize;
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.cubes.forEach((cube, index) => {
      const speed = 1 + index * .1;
      cube.rotation.x += 0.001 * speed;
      cube.rotation.y += 0.001 * speed;
    })
    this.renderer.render(this.scene, this.camera)
  }

  makeInstance(geometry: any, color: any, x: number) {
    const material = new THREE.MeshPhongMaterial({ color });

    const cube = new THREE.Mesh(geometry, material);
    this.scene.add(cube);

    cube.position.x = x;

    return cube;
  }





  init() {
    // this.mapObj = new lineMap(
    //   this.box.nativeElement,
    //   this.provinceInfo.nativeElement,
    //   {
    //     tagClick: this.tagClick.bind(this)
    //   }
    // );
    this.mapObj.init();
    this.mapObj.setTag(this.tagData)
  }

  tagClick() {

  }

}
