library(readr)
library(stringi)
library(dplyr)

txt <- dir("text")
index <- as.numeric(stri_sub(txt, 11, 14))

for (i in seq_along(txt)) {
  file.copy(sprintf("text/interview_%04d.txt", index[i]),
            sprintf("../public/data/text/interview_%04d.txt", index[i] - 1),
            overwrite=TRUE)
}

header <- '<?xml version="1.0" encoding="UTF-8"?><TEI xmlns="http://www.tei-c.org/ns/1.0" rendition="tei:teisimple">
   <teiHeader>
      <fileDesc>
         <titleStmt>
            <title/>
         </titleStmt>
         <publicationStmt>
            <p>Federal Writers Project</p>
         </publicationStmt>
         <sourceDesc>
            <p>Federal Writers Project</p>
         </sourceDesc>
      </fileDesc>
   </teiHeader>
   <text>
      <body>
         <div>'

footer <- "         </div>
      </body>
   </text>
</TEI>"

for (i in seq_along(txt)) {
  x <- readLines(sprintf("text/interview_%04d.txt", index[i]))
  x <- stri_replace_all(x, "", regex="<[^>]+>")
  x <- stri_replace_all(x, "&amp;", fixed="&")
  x <- sprintf("<p>%s</p>", x)
  x <- c(header, x, footer)
  writeLines(x, sprintf("../public/data/xml/interview_%04d.xml", index[i] - 1))
}
