let scene, camera, renderer, cube, bullet, bullets = [];

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Создание куба
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    const light = new THREE.AmbientLight(0x404040);
    scene.add(light);

    document.addEventListener('keydown', onDocumentKeyDown, false);
    window.addEventListener('resize', onWindowResize, false);

    animate();
}

function animate() {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    bullets.forEach(bullet => {
        bullet.position.z -= 0.1;
        if (bullet.position.z < -10) {
            scene.remove(bullet);
        }
    });
    bullets = bullets.filter(bullet => bullet.position.z > -10);

    renderer.render(scene, camera);
}

function onDocumentKeyDown(event) {
    const keyCode = event.which;
    if (keyCode === 87) { // W key
        camera.position.z -= 0.1;
    } else if (keyCode === 83) { // S key
        camera.position.z += 0.1;
    } else if (keyCode === 32) { // Space key
        shoot();
    }
}

function shoot() {
    const geometry = new THREE.SphereGeometry(0.1);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    bullet = new THREE.Mesh(geometry, material);
    bullet.position.set(camera.position.x, camera.position.y, camera.position.z);
    scene.add(bullet);
    bullets.push(bullet);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

init();
