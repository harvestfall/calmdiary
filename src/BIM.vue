<template>
  <div id="BIM">
    <headernav></headernav>
    <hr>
    <div id="container" @click="get3dposition($event)"></div>
  </div>
</template>

<script>
/* eslint-disable */
  import * as Three from 'Three'
  import {OrbitControls} from 'Three/examples/jsm/controls/OrbitControls'
  // import {OBJLoader} from 'Three-obj-mtl-loader';
  // const OrbitControls = require('Three-orbit-controls')(Three);
  import {GLTFLoader} from 'Three/examples/jsm/loaders/GLTFLoader'
  import headernav from './components/HeaderNav'
  export default {
    name: 'ThreeTest',
    data () {
      return {
        camera: null,
        scene: null,
        renderer: null,
        mesh: null,
        light:null
      }
    },
    components:{
      headernav
    },
    methods: {
      init2(){
        //舞台
        this.scene = new Three.Scene();
        //摄像头
        this.camera = new Three.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
        //设置场景和     模型的去边齿antialias:true
        this.renderer = new Three.WebGLRenderer({antialias:true});
        this.renderer.setSize(window.innerWidth,500);
        //添加在div上
        document.getElementById('container').appendChild(this.renderer.domElement);
        //设置监听
        window.addEventListener('resize',() => this.onWindowResize());
        // //创建一个长方体
        // const box = new Three.BoxGeometry(1,1,1);

        // //创建材质
        // const textureLoader = new Three.TextureLoader();
        // const boxzaizhi = textureLoader.load('box.jpg');
        // //设置材质 以及双面渲染
        // const meshBasicMaterial = new Three.MeshBasicMaterial({map:boxzaizhi});
        // //将材质和长方体进行绑定
        // this.mesh = new Three.Mesh(box,meshBasicMaterial);
        const panle =new Three.PlaneBufferGeometry(100,100);
        
        const meshBasicMaterial = new Three.MeshBasicMaterial({color:'write'});
        this.mesh = new Three.Mesh(panle,meshBasicMaterial);
        this.mesh.rotation.x = -Math.PI/2;
        //调整摄像头的高度
        this.camera.position.set(0,0,5);
        this.camera.rotation.set(0,-Math.PI/2,0);
        //将正方体添加在舞台中
        this.scene.add(this.mesh);
        this.scene.add(new Three.GridHelper(100,100));
        this.render();
        //设置可以使用鼠标进行缩放和滑动
        new OrbitControls(this.camera,this.renderer.domElement);

        //加载外部模型
        const gltfloader = new GLTFLoader();
        gltfloader.load('http://localhost:8080/SOldier.glb',glbf=>{
          console.log(glbf);
          //将外部模型的场景添加到当前场景下
          this.scene.add(glbf.scene);
          this.scene.add(new Three.AmbientLight(0xFFFFFF,1));
        });

      },
      onWindowResize:function(){
        this.renderer.setSize(window.innerWidth,window.innerHeight);
      },
      render:function(){
        window.requestAnimationFrame(() => this.render());
        
        // const box1 = this.mesh;
        // console.log(box1);
        // box1.rotation.x+=0.01;
        // box1.rotation.y+=0.01;
        // box1.rotation.z+=0.01;
        this.renderer.render(this.scene,this.camera);
      },
      get3dposition:function(event){
        event.preventDefault();
        var vector = new Three.Vector3();//三维坐标对象
        vector.set(
          ( event.clientX / window.innerWidth ) * 2 - 1,
          - ( event.clientY / window.innerHeight ) * 2 + 1,
          0.5 );
        vector.unproject( this.camera );
        var raycaster = new Three.Raycaster(this.camera.position, vector.sub(this.camera.position).normalize());
        var intersects = raycaster.intersectObjects(this.scene.children);
        if (intersects.length > 0) {
          var selected = intersects[0];//取第一个物体
          console.log("x坐标:"+selected.point.x);
          console.log("y坐标:"+selected.point.y);
          console.log("z坐标:"+selected.point.z);
        }
      }
    },
    mounted () {
      this.init2();
    }
  }
</script>
<style lang="scss">
  #container{
    position: relative;
    top: 80px;
  }
</style>
