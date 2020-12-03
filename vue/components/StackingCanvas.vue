<template>
  <div class="content-wrapper" style="min-height: 546px">
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6"></div>
          <div class="col-sm-6"></div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-9">
            <div class="card">
              <div class="card-header"><h5 class="m-0">Radiografia</h5></div>
              <div id="card-canvas" class="card-body">
                <div id="stack-canvas">
                  <canvas
                    id="image"
                    style="position: absolute; left: 0; top: 0; z-index: 0"
                  >
                  </canvas>
                  <canvas
                    id="landmarks"
                    style="position: absolute; left: 0; top: 0; z-index: 2"
                  >
                  </canvas>
                  <canvas
                    id="bezier"
                    style="position: absolute; left: 0; top: 0; z-index: 1"
                  >
                  </canvas>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3">
            <div class="card">
              <div class="card-header"><h5 class="m-0">Referência</h5></div>
              <div class="card-body" id="canvas-reference">
                <canvas id="referenceLandmark"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
