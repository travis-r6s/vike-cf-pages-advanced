import type { FC } from 'react'
import { Document, PDFViewer, Page, StyleSheet, Text, View } from '@react-pdf/renderer'

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
})

// Create Document Component
function MyDocument() {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Section #1</Text>
        </View>
        <View style={styles.section}>
          <Text>Section #2</Text>
        </View>
      </Page>
    </Document>
  )
}

/**
 * The `react-pdf` package isn't actually _that_ large, so in our `ClientOnly` component load function
 * we add a delay to simulate a large component being loaded.
 */
const HeavyComponent: FC = () => {
  return (
    <PDFViewer>
      <MyDocument />
    </PDFViewer>
  )
}

export default HeavyComponent
