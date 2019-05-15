// tool made by Dan Tramte

const fmsTXT1 = 'Follow My Score'
const fmsTXT3 = 'Selected Work'

let sfFont;
let season, fmsTXT2 = ''
let currentYear, fmsYear = 0

function setup() {
  cnv = createCanvas(1920, 1080);
  cnv.position(0, 20)
  pixelDensity(1);
  
  if (month() < 6) {
    season = 'Spring'
  } else {
    season = 'Fall'
  }
  
  currentYear = year().toString()
  fmsYear = currentYear[2]+currentYear[3]

  sfFont = loadFont('assets/fedra.ttf', () => {
    genTXT(fmsYear, season)
  })

  getYear = createSelect()
  for (let i = 0; i < 100; i++) {
    getYear.option(i.toString())
  }
  getYear.changed(() => {
    fmsYear = getYear.value()
    genTXT(fmsYear, season)
  })
  getYear.value(fmsYear)

  getSeason = createSelect()
  getSeason.option('Spring')
  getSeason.option('Fall')
  getSeason.changed(() => {
    season = getSeason.value()
    genTXT(fmsYear, season)
  })

  downloadSlide = createButton('download slide');
  downloadSlide.mouseClicked(() => {
    saveCanvas(cnv, 'slide', 'png');
  })

}

genTXT = (y, s) => {
  fmsTXT2 = ' [' + s + y + '] '

  textFont(sfFont);
  textSize(60);
  tgWidth = textWidth(fmsTXT1) + textWidth(fmsTXT2) + textWidth(fmsTXT3)
  console.log(tgWidth)


  background('#4D4D4D')

  tg = createGraphics(tgWidth, 100)

  tg.textSize(60);
  tg.textFont(sfFont);
  tg.fill(255)
  tg.text(fmsTXT1, 0, tg.height / 2 + 20, tg.width);

  switch (s) {
    case 'Spring':
      tg.fill('#29ABE2');
      break;
    case 'Fall':
      tg.fill('#FBB03B');
      break;
  }
  
  tg.text(fmsTXT2, textWidth(fmsTXT1), tg.height / 2 + 20, tg.width);
  tg.fill(255)
  tg.text(fmsTXT3, textWidth(fmsTXT1) + textWidth(fmsTXT2), tg.height / 2 + 20, tg.width);
  rectMode(CENTER)
  image(tg, width / 2 - tg.width / 2, height / 2 - 50)
}