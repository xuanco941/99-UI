const initCameraRig = function () {
    var cameraRigEl = this.cameraRigEl = document.createElement('a-entity');
    var cameraEl = this.cameraEl = document.createElement('a-entity');
    var rightHandEl = this.rightHandEl = document.createElement('a-entity');
    var leftHandEl = this.leftHandEl = document.createElement('a-entity');

    cameraEl.setAttribute('camera', { fov: 60 });
    cameraEl.setAttribute('look-controls', {
        magicWindowTrackingEnabled: false,
        mouseEnabled: false,
        touchEnabled: false
    });

    rightHandEl.setAttribute('rotation', '0 90 0');
    rightHandEl.setAttribute('laser-controls', { hand: 'right' });
    rightHandEl.setAttribute('raycaster', { objects: '.raycastable' });
    rightHandEl.setAttribute('line', { color: '#118A7E' });

    leftHandEl.setAttribute('rotation', '0 90 0');
    leftHandEl.setAttribute('laser-controls', { hand: 'left' });
    leftHandEl.setAttribute('raycaster', { objects: '.raycastable' });
    leftHandEl.setAttribute('line', { color: '#118A7E' });

    cameraRigEl.appendChild(cameraEl);
    cameraRigEl.appendChild(rightHandEl);
    cameraRigEl.appendChild(leftHandEl);

    this.el.appendChild(cameraRigEl);
};

const initBackground = function () {
    var backgroundEl = this.backgroundEl = document.querySelector('a-entity');
    backgroundEl.setAttribute('geometry', { primitive: 'sphere', radius: 65 });
    backgroundEl.setAttribute('material', {
        shader: 'background-gradient',
        colorTop: '#37383c',
        colorBottom: '#757575',
        side: 'back'
    });
    backgroundEl.setAttribute('hide-on-enter-ar', '');
}

const initEntities = function () {
    // Container for our entities to keep the scene clean and tidy.
    var containerEl = this.containerEl = document.createElement('a-entity');
    // Plane used as a hit target for laser controls when in VR mode
    var laserHitPanelEl = this.laserHitPanelEl = document.createElement('a-entity');
    // Models are often not centered on the 0,0,0.
    // We will center the model and rotate a pivot.
    var modelPivotEl = this.modelPivotEl = document.createElement('a-entity');
    // This is our glTF model entity.
    var modelEl = this.modelEl = document.createElement('a-entity');
    // Real time shadow only used in AR mode.
    var arShadowEl = this.arShadowEl = document.createElement('a-entity');
    // Scene ligthing.
    var lightEl = this.lightEl = document.createElement('a-entity');
    var sceneLightEl = this.sceneLightEl = document.createElement('a-entity');

    sceneLightEl.setAttribute('light', {
        type: 'hemisphere',
        intensity: 1
    });
    sceneLightEl.setAttribute('hide-on-enter-ar', '');

    modelPivotEl.id = 'modelPivot';

    this.el.appendChild(sceneLightEl);

    laserHitPanelEl.id = 'laserHitPanel';
    laserHitPanelEl.setAttribute('position', '0 0 -10');
    laserHitPanelEl.setAttribute('geometry', 'primitive: plane; width: 30; height: 20');
    laserHitPanelEl.setAttribute('material', 'color: red');
    laserHitPanelEl.setAttribute('visible', 'false');
    laserHitPanelEl.classList.add('raycastable');

    this.containerEl.appendChild(laserHitPanelEl);

    modelEl.setAttribute('rotation', '0 -30 0');
    modelEl.setAttribute('animation-mixer', '');
    modelEl.setAttribute('shadow', 'cast: true; receive: false');
    modelEl.setAttribute('id', 'modelEl');

    modelPivotEl.appendChild(modelEl);

    arShadowEl.setAttribute('rotation', '-90 0 0');
    arShadowEl.setAttribute('geometry', 'primitive: plane; width: 30.0; height: 30.0');
    arShadowEl.setAttribute('shadow', 'receive: true');
    arShadowEl.setAttribute('ar-shadows', 'opacity: 0.2');
    arShadowEl.setAttribute('visible', 'false');

    this.el.addEventListener('ar-hit-test-select-start', function () {
        arShadowEl.object3D.visible = false;
    });

    this.el.addEventListener('ar-hit-test-select', function () {
        arShadowEl.object3D.visible = true;
    });

    modelPivotEl.appendChild(arShadowEl);

    lightEl.id = 'light';
    lightEl.setAttribute('position', '-2 4 2');
    lightEl.setAttribute('light', {
        type: 'directional',
        castShadow: true,
        shadowMapHeight: 1024,
        shadowMapWidth: 1024,
        shadowCameraLeft: -7,
        shadowCameraRight: 5,
        shadowCameraBottom: -5,
        shadowCameraTop: 5,
        intensity: 0.5,
        target: 'modelPivot'
    });

    this.containerEl.appendChild(lightEl);
    this.containerEl.appendChild(modelPivotEl);

    this.el.appendChild(containerEl);
}