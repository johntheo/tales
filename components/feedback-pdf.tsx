import { Document, Page, Text, View, StyleSheet, PDFViewer, Image, Link } from '@react-pdf/renderer';
import { Areas, Reference, References } from './feedback-entry';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
  },
  header: {
    marginBottom: 30,
    paddingBottom: 20,
    borderBottom: '1px solid #e2e8f0',
  },
  title: {
    fontSize: 28,
    marginBottom: 10,
    textAlign: 'center',
    color: '#1a202c',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#4a5568',
    marginBottom: 20,
  },
  section: {
    marginBottom: 25,
    padding: 15,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 12,
    color: '#2d3748',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 12,
    marginBottom: 8,
    color: '#4a5568',
  },
  scoreContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  scoreLabel: {
    fontSize: 14,
    color: '#4a5568',
    width: '30%',
  },
  scoreValue: {
    fontSize: 14,
    color: '#2d3748',
    fontWeight: 'bold',
  },
  feedback: {
    fontSize: 12,
    marginBottom: 12,
    color: '#4a5568',
    lineHeight: 1.5,
  },
  reference: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 4,
    border: '1px solid #e2e8f0',
  },
  referenceTitle: {
    fontSize: 14,
    marginBottom: 5,
    color: '#2d3748',
    fontWeight: 'bold',
  },
  referenceSummary: {
    fontSize: 12,
    color: '#4a5568',
    lineHeight: 1.4,
    marginBottom: 5,
  },
  referenceLink: {
    fontSize: 12,
    color: '#3182ce',
    textDecoration: 'none',
  },
  metricsGrid: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  metricCard: {
    width: '48%',
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 4,
    border: '1px solid #e2e8f0',
  },
  metricTitle: {
    fontSize: 14,
    marginBottom: 5,
    color: '#2d3748',
    fontWeight: 'bold',
  },
  metricScore: {
    fontSize: 16,
    color: '#3182ce',
    fontWeight: 'bold',
  },
  referenceType: {
    marginBottom: 15,
  },
});

interface FeedbackPDFProps {
  fileName: string;
  description: string;
  metrics: Areas;
  references: References;
}

export function FeedbackPDF({ fileName, description, metrics, references }: FeedbackPDFProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Feedback Report</Text>
          <Text style={styles.subtitle}>Detailed analysis of your presentation</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Presentation Details</Text>
          <Text style={styles.text}>File: {fileName}</Text>
          <Text style={styles.text}>Description: {description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Performance Analysis</Text>
          <View style={styles.metricsGrid}>
            {Object.entries(metrics).map(([key, value]) => (
              <View key={key} style={styles.metricCard}>
                <Text style={styles.metricTitle}>
                  {key.replace('_', ' ').toUpperCase()}
                </Text>
                <Text style={styles.metricScore}>
                  Score: {value.score}/10
                </Text>
                <Text style={styles.feedback}>
                  {value.feedback}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommended Resources</Text>
          {Object.entries(references).map(([type, items]) => (
            <View key={type} style={styles.referenceType}>
              <Text style={styles.sectionTitle}>{type.toUpperCase()}</Text>
              {items.map((ref: Reference, index: number) => (
                <View key={index} style={styles.reference}>
                  <Text style={styles.referenceTitle}>{ref.title}</Text>
                  <Text style={styles.referenceSummary}>{ref.summary}</Text>
                  <Link src={ref.link} style={styles.referenceLink}>
                    {ref.link}
                  </Link>
                </View>
              ))}
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
} 