package main

import (
	"fmt"
	"io/fs"
	"os"
	"path/filepath"
	"strings"
	"time"

	"go.mattglei.ch/timber"
	"golang.org/x/text/cases"
	"golang.org/x/text/language"
)

const (
	folder           = "../../static/fonts"
	cssPath          = "../../src/styles/fonts.css"
	sveltePath       = "../../src/lib/fonts.svelte"
	generatedFromMsg = "generated from /scripts/fonts. do not manually edit."
)

type font struct {
	family string
	weight int
	src    string
	style  string
}

func main() {
	timber.Timezone(time.Local)
	timber.TimeFormat("03:04:05")

	fonts := collectFonts()
	timber.Done("collected fonts")

	writeCSS(fonts)
	timber.Done("wrote css to", filepath.Base(cssPath))

	writeSvelte(fonts)
	timber.Done("wrote svelte to", filepath.Base(sveltePath))
}

func collectFonts() []font {
	var (
		weights = map[string]int{
			"thin":       100,
			"extra_thin": 200,
			"light":      300,
			"normal":     400,
			"medium":     500,
			"semibold":   600,
			"bold":       700,
			"extra_bold": 800,
			"black":      900,
		}
		titleCaser = cases.Title(language.AmericanEnglish, cases.Compact)
		fonts      = []font{}
	)

	err := filepath.WalkDir(folder, func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			return err
		}

		if d.IsDir() {
			return nil
		}

		filename := filepath.Base(path)
		if filename == ".DS_Store" {
			return nil
		}
		if !strings.HasSuffix(filename, ".woff2") {
			timber.FatalMsg(
				path,
				"is not a woff2 file; please convert: https://kombu.kanejaku.org",
			)
		}

		var weight int
		for weightName, w := range weights {
			if strings.HasPrefix(filename, weightName) {
				weight = w
				break
			}
		}
		if weight == 0 {
			timber.FatalMsg("invalid font weight for", path)
		}

		var style string
		if strings.Contains(filename, "_italic") {
			style = "italic"
		}

		fonts = append(fonts, font{
			family: strings.ReplaceAll(titleCaser.String(
				strings.ReplaceAll(filepath.Base(filepath.Dir(path)), "_", " "),
			), "Ibm", "IBM"),
			weight: weight,
			style:  style,
			src:    strings.ReplaceAll(path, "../../static/", "/"),
		})
		return nil
	})
	if err != nil {
		timber.Fatal(err, "failed to walk", folder)
	}
	return fonts
}

func writeCSS(fonts []font) {
	css := strings.Builder{}
	css.WriteString(fmt.Sprintf("/* %s */\n", generatedFromMsg))
	for _, f := range fonts {
		css.WriteString("\n@font-face {\n")
		css.WriteString(fmt.Sprintf("\tfont-family: '%s';\n", f.family))
		css.WriteString(fmt.Sprintf("\tsrc: url('%s');\n", f.src))
		css.WriteString(fmt.Sprintf("\tfont-weight: %d;\n", f.weight))
		css.WriteString(fmt.Sprintf("\tfont-display: swap;\n"))
		if f.style != "" {
			css.WriteString(fmt.Sprintf("\tfont-style: %s;\n", f.style))
		}
		css.WriteString("}\n")
	}

	err := os.WriteFile(cssPath, []byte(css.String()), os.ModePerm)
	if err != nil {
		timber.Fatal(err, "failed to write css to", cssPath)
	}
}

func writeSvelte(fonts []font) {
	svelte := strings.Builder{}
	svelte.WriteString(fmt.Sprintf("<!-- %s -->\n", generatedFromMsg))
	svelte.WriteString("\n<svelte:head>\n")
	for _, f := range fonts {
		svelte.WriteString("\t<link\n")
		svelte.WriteString("\t\trel=\"preload\"\n")
		svelte.WriteString(fmt.Sprintf("\t\thref=\"%s\"\n", f.src))
		svelte.WriteString("\t\tas=\"font\"\n")
		svelte.WriteString("\t\ttype=\"font/woff2\"\n")
		svelte.WriteString("\t\tcrossorigin=\"anonymous\"\n")
		svelte.WriteString("\t/>\n")
	}
	svelte.WriteString("</svelte:head>\n")

	err := os.WriteFile(sveltePath, []byte(svelte.String()), os.ModePerm)
	if err != nil {
		timber.Fatal(err, "failed to write svelte to", sveltePath)
	}
}
