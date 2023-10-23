function getRandomColor(e) {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


var originalMaterials = [];
var lengthOM = 0;


const model = document.querySelector('#model');

function elmClick(btn, uuid) {
    const obj3d = model.getObject3D('mesh');
    obj3d.traverse(node => {
        if (node.isMesh && node.uuid == uuid) {
            node.material.color.set(btn.style.backgroundColor);
        }
    });
}

const back = document.querySelector('#back');
back.addEventListener('click', () => {
    const obj3d = model.getObject3D('mesh');
    if (originalMaterials.length > lengthOM) {
        const node2 = originalMaterials.pop();
        obj3d.traverse(node => {
            if (node2.uuid == node.uuid) {
                node.material = node2.nodeMaterial;
            }
        });
    }
    else {
        console.log(originalMaterials)
        obj3d.traverse(node => {
            if (node.isMesh) {
                let n = originalMaterials.find(item => item.uuid == node.uuid);
                node.material = n.nodeMaterial;
                node.material.color = n.material.color;
            }
        })
    }
});

const menuShow = document.querySelector('#menuShow');
model.addEventListener('model-loaded', () => {
    menuShow.innerHTML = "";

    const obj3d = model.getObject3D('mesh');
    obj3d.traverse(node => {
        if (node.isMesh) {
            lengthOM = lengthOM + 1;
            originalMaterials.push({ uuid: node.uuid, nodeMaterial: node.material, color: node.material.color });
            menuShow.insertAdjacentHTML('beforeend', `<button style="background-color: ${getRandomColor()}" onclick="elmClick(this,'${node.uuid}')" type="button">${node.name}</button>`)
        }
    });
    console.log(originalMaterials)
});





const tomau = document.querySelector('#tomau');

tomau.addEventListener('click', () => {
    const obj3d = model.getObject3D('mesh');
    obj3d.traverse(node => {
        if (node.isMesh) {
            console.log(node.material)
            node.material.color.set('green');
        }
    });
});

var textureLoader = new THREE.TextureLoader();
textureLoader.load('./me.jpg', function (texture) {

});
