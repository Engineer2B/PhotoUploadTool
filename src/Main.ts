import * as sharp from "sharp";
sharp("input.jpg")
	.rotate()
	.resize(200)
	.toBuffer()
	.then(data => {
	})
	.catch(err => { });