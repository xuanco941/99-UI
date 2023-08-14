
//model viewer scene

//camera
AFRAME.registerComponent('model-viewer-camera', {
  schema: {},
  init: function () {
    this.el.object3D.position.z = 3.0;
    // When in mobile landscape we want to bring the model a bit closer.
    if (AFRAME.utils.device.isLandscape()) { this.el.object3D.position.z -= 1; }
  }
});

//model
AFRAME.registerComponent('model-viewer-el', {
  schema: {},
  init: function () {
    var modelEl = this.el;
    this.el.addEventListener('model-loaded', function () {
      var box;
      var size;
      var center;
      var scale;
      var gltfObject = modelEl.getObject3D('mesh');

      // Reset position and scales.
      modelEl.object3D.position.set(0, 0, 0);
      modelEl.object3D.scale.set(1.0, 1.0, 1.0);

      // Calculate model size.
      modelEl.object3D.updateMatrixWorld();
      box = new THREE.Box3().setFromObject(gltfObject);
      size = box.getSize(new THREE.Vector3());

      // Calculate scale factor to resize model to human scale.
      scale = 1.6 / size.y;
      scale = 2.0 / size.x < scale ? 2.0 / size.x : scale;
      scale = 2.0 / size.z < scale ? 2.0 / size.z : scale;

      modelEl.object3D.scale.set(scale, scale, scale);

      // Center model at (0, 0, 0).
      modelEl.object3D.updateMatrixWorld();
      box = new THREE.Box3().setFromObject(gltfObject);
      center = box.getCenter(new THREE.Vector3());
      size = box.getSize(new THREE.Vector3());

      modelEl.object3D.position.x = -center.x;
      modelEl.object3D.position.y = -center.y;
      modelEl.object3D.position.z = -center.z;


    });
  }
});

var onWheelModelView;

/* global AFRAME, THREE */
AFRAME.registerComponent('model-viewer', {
  schema: {
    id: { default: '1' }
  },
  init: function () {
    var el = this.el;
    var modelPivot = this.el.querySelector('.model-pivot');
    //func
    const dragModel = function (evt) {
      var dX;
      var dY;
      if (!this.oldClientX) { return; }
      dX = this.oldClientX - evt.clientX;
      dY = this.oldClientY - evt.clientY;
      modelPivot.object3D.position.y += dY / 200;
      modelPivot.object3D.position.x -= dX / 200;
      this.oldClientX = evt.clientX;
      this.oldClientY = evt.clientY;
    };

    const rotateModel = function (evt) {
      var dX;
      var dY;
      if (!this.oldClientX) { return; }
      dX = this.oldClientX - evt.clientX;
      dY = this.oldClientY - evt.clientY;
      modelPivot.object3D.rotation.y -= dX / 100;
      modelPivot.object3D.rotation.x -= dY / 200;

      // Clamp x rotation to [-90,90]
      modelPivot.object3D.rotation.x = Math.min(Math.max(-Math.PI / 2, modelPivot.object3D.rotation.x), Math.PI / 2);

      this.oldClientX = evt.clientX;
      this.oldClientY = evt.clientY;
    };



    // Disable context menu on canvas when pressing mouse right button;
    this.el.sceneEl.canvas.oncontextmenu = function (evt) { evt.preventDefault(); };

    // Mouse 2D controls.
    el.addEventListener('mouseup', function (evt) {
      el.leftRightButtonPressed = false;
      if (evt.buttons === undefined || evt.buttons !== 0) { return; }
      el.oldClientX = undefined;
      el.oldClientY = undefined;
    });
    el.addEventListener('mousemove', function (evt) {
      if (this.leftRightButtonPressed) {
        dragModel(evt);
      } else {
        rotateModel(evt);
      }
    });
    el.addEventListener('mousedown', function (evt) {
      if (evt.buttons) { el.leftRightButtonPressed = evt.buttons === 3; }
      el.oldClientX = evt.clientX;
      el.oldClientY = evt.clientY;
    });
    onWheelModelView = () => {
      var modelScale = el.modelScale || modelPivot.object3D.scale.x;
      modelScale -= evt.deltaY / 100;
      modelScale = Math.min(Math.max(0.8, modelScale), 2.0);
      // Clamp scale.
      modelPivot.object3D.scale.set(modelScale, modelScale, modelScale);
      el.modelScale = modelScale;
    }
    el.addEventListener('wheel', onWheelModelView);

    // Mobile 2D controls.
    el.addEventListener('touchend', function (evt) {
      this.oldClientX = undefined;
      this.oldClientY = undefined;
      if (evt.touches.length < 2) { this.oldDistance = undefined; }
    });
    el.addEventListener('touchmove', function (evt) {
      if (evt.touches.length === 1) {
        var dX;
        var dY;
        this.oldClientX = this.oldClientX || evt.touches[0].clientX;
        this.oldClientY = this.oldClientY || evt.touches[0].clientY;

        dX = this.oldClientX - evt.touches[0].clientX;
        dY = this.oldClientY - evt.touches[0].clientY;

        modelPivot.object3D.rotation.y -= dX / 200;
        this.oldClientX = evt.touches[0].clientX;

        modelPivot.object3D.rotation.x -= dY / 100;

        // Clamp x rotation to [-90,90]
        modelPivot.object3D.rotation.x = Math.min(Math.max(-Math.PI / 2, modelPivot.object3D.rotation.x), Math.PI / 2);
        this.oldClientY = evt.touches[0].clientY;
      }
      if (evt.touches.length === 2) { this.onPinchMove(evt); }
    });

  },

  tick: function () {
    // Kiểm tra trạng thái VR
    if (this.el.sceneEl.is('vr-mode')) {
      this.el.addEventListener('wheel', onWheelModelView);
    } else {
      this.el.removeEventListener('wheel', onWheelModelView);
    }

    var modelPivot = this.el.querySelector('.model-pivot');
    var intersection;
    var intersectionPosition;
    var laserHitPanelEl = this.laserHitPanelEl;
    var activeHandEl = this.activeHandEl;
    if (!this.el.sceneEl.is('vr-mode')) { return; }
    if (!activeHandEl) { return; }
    intersection = activeHandEl.components.raycaster.getIntersection(laserHitPanelEl);
    if (!intersection) {
      activeHandEl.setAttribute('raycaster', 'lineColor', 'white');
      return;
    }
    activeHandEl.setAttribute('raycaster', 'lineColor', '#007AFF');
    intersectionPosition = intersection.point;
    this.oldHandX = this.oldHandX || intersectionPosition.x;
    this.oldHandY = this.oldHandY || intersectionPosition.y;

    modelPivot.object3D.rotation.y -= (this.oldHandX - intersectionPosition.x) / 4;
    modelPivot.object3D.rotation.x += (this.oldHandY - intersectionPosition.y) / 4;

    this.oldHandX = intersectionPosition.x;
    this.oldHandY = intersectionPosition.y;
  }

});

