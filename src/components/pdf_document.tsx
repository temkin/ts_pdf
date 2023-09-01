// import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import { PDFContents } from '../types';
import React from 'react';


// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    whiteSpace: 'pre-wrap',
    fontSize: '16'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    whiteSpace: 'pre-wrap'
  }
});

type CParams = {
  content: PDFContents[]
}


const hyphenationCallback = (word:any) => {
  return [word.replaceAll(' ', "\t")]
}

Font.registerHyphenationCallback(hyphenationCallback);

// Create Document Component
export const  PDFDocument = (params: CParams) => {
  const { content } = params
  let pages = [];
  for (const k in content){
    const data = content[k];
    if (!data.render){
      continue ;
    }
    const page = (
      <React.Fragment key={data.name}>
        <Text> </Text>
        <Text wrap={true}>
            {data.content?.toString()}
        </Text>
        <Text> </Text>
        <Text>_________________________________</Text>
        <Text> </Text>
      </React.Fragment>
    )
    pages.push(page);
  }
  return (
    <Document>
      <Page size="A4" style={styles.page} wrap={true}>
        <View style={styles.section}>
          {pages}
        </View>
      </Page>
    </Document>
  )
}
