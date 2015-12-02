w = 1024, h = 768;
var renderer = new PIXI.WebGLRenderer(w, h);

document.body.appendChild(renderer.view);

var stage = new PIXI.Container();
var container = new PIXI.Container();
var foreground = new PIXI.Container();
stage.addChild(container);
stage.addChild(foreground);

var cat, bg, d, f;

PIXI.loader.add('bg', './img/bg.jpg').load(function (loader, resources) {
  bg = new PIXI.Sprite(resources.bg.texture);
  bg.position.x = w / 2;
  bg.position.y = h / 2;
  bg.scale.x = 1.6;
  bg.scale.y = 1.6;
  bg.pivot.x = 1509 / 2;
  bg.pivot.y = 935 / 2;
  container.addChild(bg);
});

var pickles = [];
PIXI.loader.add('pickle', './img/bannana.png').load(function (loader, resources) {
  var shadow = new PIXI.filters.DropShadowFilter();
  shadow.distance = 0;
  shadow.blur = 20;

  for (i=0; i<5; i++) {
    var p = new PIXI.Sprite(resources.pickle.texture);
    p.position.y = Math.random() * 400;
    p.pivot.x = 480/2;
    p.pivot.y = 263/2;
    p.scale.x = 0.25;
    p.scale.y = 0.25;

    p.filters = [shadow];

    pickles[i] = p;
    foreground.addChild(p);
  }
});

var aliens = [];
PIXI.loader.add('alien', './img/spooky-bannana.png').load(function (loader, resources){
	var shadow = new PIXI.filters.DropShadowFilter();
  	shadow.distance = 0;
  	shadow.blur = 20;

	for(i=0;i<2;i++) {
		var a = new PIXI.Sprite(resources.alien.texture);
		a.pivot.x = 480/2;
		a.pivot.y = 263/2;
		a.scale.x = 0.25;
		a.scale.y = 0.25;

		a.filters = [shadow];

		aliens[i] = a;
		foreground.addChild(a);
	}
});


PIXI.loader.add('cat', './img/space-monkey.png').load(function (loader, resources) {
  cat = new PIXI.Sprite(resources.cat.texture);
  cat.pivot.x = 250;
  cat.pivot.y = 320;
  cat.position.x = w / 2;
  cat.position.y = h -100;
  cat.scale.x = w / 500 * 0.6;
  cat.scale.y = h / 333 * 0.6;
  foreground.addChild(cat);
});


var mousex = w/2, mousey = h/2;
PIXI.loader.add('catdisplacement', './img/mesmercatdisplacement.jpg').load(function (loader, resources) {
  catd = new PIXI.Sprite(resources.catdisplacement.texture);
  catf = new PIXI.filters.DisplacementFilter(catd, 0);
  cat.filters = [catf];
  cat.addChild(catd)

  window.onmousemove = function(e) {
    mousex = e.clientX;
    mousey = e.clientY;
  };
});


var f3;
PIXI.loader.add('displacement', './img/clouds.jpg').load(function (loader, resources) {
  d1 = new PIXI.Sprite(resources.displacement.texture);
  f1 = new PIXI.filters.DisplacementFilter(d1, 40);

  d1.scale.x = 2;
  d1.scale.y = 2;

  var f2 = new PIXI.filters.RGBSplitFilter();
  f2.red.x = -2;
  f2.red.y = 2;
  f2.green.x = 0;
  f2.green.y = 0;
  f2.blue.x = 2;
  f2.blue.y = -2;

  // f3 = new PIXI.filters.TiltShiftFilter();
  // f3.gradientBlur = 800;
  // f3.blur = 20;

  container.filters = [f2, f1];
  container.addChild(d1);
});

var brightness = new PIXI.filters.ColorMatrixFilter();
brightness.brightness(0.8, 1);
var bloom = new PIXI.filters.BloomFilter();
stage.filters = [brightness, bloom];

function animate() {
  requestAnimationFrame(animate);

  var d = +new Date();

  d1.position.x = 200 * Math.sin(d / 1200);
  d1.position.y = 200 * Math.cos(d / 1200);

  f1.scale.x = 170 * Math.sin(d / 1100);
  f1.scale.y = 170 * Math.cos(d / 1070);

  bg.rotation = 0.1 * Math.sin(d / 10000);
  cat.rotation = 0.04 * Math.cos(d / 1000);

  for (i=0; i<pickles.length; i++) {
    pickles[i].position.x = ((d/(25+i) + i*700)) % (w + 800) - 400;
    pickles[i].position.y = 100 * Math.sin(i + d / 5000) + 150;
    pickles[i].rotation = Math.sign(i-1.5) * d / (2500 + 300 * i);
  }

  for(i=0;i<aliens.length; i++) {
  	aliens[i].position.x = ((d/(25+i) + i*700)) % (w + 800) - 400;
    aliens[i].position.y = 100 * Math.sin(i + d / 5000) + 150;
    aliens[i].rotation = Math.sign(i-1.5) * d / (2500 + 300 * i);
  }

  catf.scale.x = (window.innerWidth/2 - mousex) / 80 + 6 * Math.sin(d/1000);
  catf.scale.y = (window.innerHeight/2 - mousey) / 80 + 6 * Math.cos(d/1200);

  renderer.render(stage);
}

PIXI.loader.once('complete', animate);
