
//tất cả thẻ a-gltf-model sẽ có vị trí mặc định 0 0.15 -1
function setDefaultPosition(object) {
    object.setAttribute('position', { x: 0, y: 1.5, z: -1 });

    object.addEventListener('model-loaded', () => {
        const bbox = new THREE.Box3().setFromObject(object);
        const center = bbox.getCenter(new THREE.Vector3());
        object.lookAt(center);
    });
}
const obj = document.querySelector('a-gltf-model');
setDefaultPosition(obj);