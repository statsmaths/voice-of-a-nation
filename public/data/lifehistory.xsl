<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/">
  <html>
    <head>
      <link rel="shortcut icon" type="image/jpg" href="./data/stanford_up_favicon.png"/>
      <title>SLHP Life History</title>
    </head>
    <body style="font-family: 'Times New Roman', serif; font-size: calc(1em + 1vw); color: #333; text-align: justify; text-justify: inter-word;">
      <div style="margin-left:40px; margin-bottom: 60px">
        <h4><xsl:value-of select="history/title"/></h4>
        <ul style="font-size: 0.7em; list-style: none">
          <xsl:for-each select="history/meta/item">
            <li><b><xsl:value-of select="key"/></b>: <xsl:value-of select="val"/></li>
          </xsl:for-each>
          <li>
            <b>PDF</b>:
            <a href="{history/reflink}" style="color: grey">
              <xsl:value-of select="history/reflink"/>
            </a>
          </li>
        </ul>
      </div>
      <hr style="width: min(98%, 730px); margin-right:100%"/>
      <div style="margin: 40px 60px; font-size: 0.65em; max-width:650px; line-height: 1.3em;">
        <xsl:for-each select="history/text/p">
          <p>
            <xsl:value-of select="."/>
          </p>
        </xsl:for-each>
      </div>
    </body>
  </html>
</xsl:template>
</xsl:stylesheet>
