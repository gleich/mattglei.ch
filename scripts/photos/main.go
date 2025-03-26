package main

import (
	"bytes"
	"encoding/base64"
	"fmt"
	_ "image/jpeg"
	"image/png"
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/atotto/clipboard"
	"github.com/buckket/go-blurhash"
	"github.com/kolesa-team/go-webp/webp"
	"go.mattglei.ch/timber"
)

const PHOTOS_FOLDER = "../../static/photos"

var files = []string{
	"ritracing.webp",
	"a4.webp",
	"quinn.webp",
	"mtb2.webp",
	"eye.webp",
	"spider.webp",
	"up.webp",
	"cadillac.webp",
	"ladybug.webp",
	"rocky8.webp",
	"clarkson.webp",
	"motorcycle.webp",
	"mtb1.webp",
	"nyc.webp",
	"hayhay.webp",
	"pete.webp",
	"eggBeach.webp",
	"fox.webp",
	"flower.webp",
	"fog.webp",
	"boat.webp",
	"pete2.webp",
	"bug.webp",
	"porsche.webp",
}

type photo struct {
	name     string
	filename string
	path     string
	blurdata string
	width    int
	height   int
}

func main() {
	timber.Timezone(time.Local)
	timber.TimeFormat("03:04:05")

	photos := []photo{}
	for _, file := range files {
		reader, err := os.Open(filepath.Join(PHOTOS_FOLDER, file))
		if err != nil {
			timber.Fatal(err, "failed to read image:", file)
		}
		defer reader.Close()

		parsedJPG, err := webp.Decode(reader, nil)
		if err != nil {
			timber.Fatal(err, "parsing JPEG failed for", file)
		}
		width := parsedJPG.Bounds().Dx()
		height := parsedJPG.Bounds().Dy()
		blurData, err := blurhash.Encode(4, 3, parsedJPG)
		if err != nil {
			timber.Fatal(err, "creating blur data for", file, "failed")
		}

		scaleDownFactor := 200
		blurImage, err := blurhash.Decode(
			blurData,
			width/scaleDownFactor,
			height/scaleDownFactor,
			1,
		)
		if err != nil {
			timber.Fatal(err, "Encoding blurhash data to img failed for", file)
		}
		blurImageOut := new(bytes.Buffer)
		err = png.Encode(blurImageOut, blurImage)
		if err != nil {
			timber.Fatal(err, "Writing data to PNG failed", file)
		}
		base64BlurData := base64.StdEncoding.EncodeToString(blurImageOut.Bytes())

		photos = append(
			photos, photo{
				filename: file,
				name:     strings.TrimSuffix(file, ".webp"),
				path:     fmt.Sprintf("/photos/%s", file),
				blurdata: base64BlurData,
				height:   height,
				width:    width,
			},
		)
		timber.Done("processed", file)
	}

	code := "const photoData: Photo[] = ["
	for _, photo := range photos {
		code = fmt.Sprintf(
			"%s{src:'/photos/%s',alt:'%s',placeholder:'data:image/png;base64,%s', width:%d,height:%d},",
			code,
			photo.filename,
			photo.name,
			photo.blurdata,
			photo.width,
			photo.height,
		)
	}
	code = fmt.Sprintf("%s];", strings.TrimRight(code, ","))
	err := clipboard.WriteAll(code)
	if err != nil {
		timber.Fatal(err, "failed to write code to clipboard")
	}
	timber.Done("code copied to clipboard")
}
