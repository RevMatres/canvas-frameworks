
// create the stage
const stage = new Konva.Stage({
  container: 'c1',
  height: window.innerHeight,
  width: window.innerWidth
})


// create new layer
let ui = new Konva.Layer()

// create a shape
let w=200, h=200

let rect = new Konva.Rect({
  x: stage.getWidth()/2 - w/2,
  y: stage.getHeight()/2 - h/2,
  width: w,
  height: h,
  fill: 'lightblue',
  stroke: 'blue',
  strokeWidth: 5
})

rect.on("click", function(){
  addparticlL(Math.random()*100)
  anim.start()
})

let anim = new Konva.Animation(function(frame){
  let time = frame.time,
      timeDiff = frame.timeDiff,
      frameRate = frame.frameRate

  let col = Math.round(timeDiff)
  rect.x += col
}, ui)

// add shape to layer
ui.add(rect)

// add layer to stage
stage.add(ui)




// add particle layer
let particlL = new Konva.Layer()
let particles = []

function addparticlL(n){
  let x = stage.getWidth()/2
  let y = stage.getHeight()/2

  for(var i=0; i<n; i++){
    let vx = Math.random()
    let vy = Math.random()
    let r = Math.random()*250
    let g = Math.random()*250
    let b = Math.random()*250

    particles.push(
      new Konva.Circle({
        // x: x,
        // y: y,
        x: Math.random()*window.innerHeight, y: Math.random()*window.innerWidth,
        radius: 2,
        fill: "rgb("+r+","+g+","+b+")",
        vx: vx,
        vy: vy
      })
    )

    particles.forEach(val => {
      particlL.add(val)
    })
  }

  stageP()
  // animP()
}

function stageP(){
  stage.add(particlL)
}

function animP(){
  let partAnim = new Konva.Animation(function(frame){
    let time = frame.time,
        deltaT = frame.timeDiff,
        fRate = frame.frameRate

    particles.forEach(val => {
      val.attrs.y += val.attrs.vy*deltaT
    })
  }, particlL)
  partAnim.start()
}
