import { Document, Page, Text, View, StyleSheet, Image, Link } from '@react-pdf/renderer';
import { Areas, Reference, References } from './feedback-entry';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
  },
  header: {
    marginBottom: 30,
    paddingBottom: 20,
    borderBottom: '1px solid #e2e8f0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a202c',
  },
  title: {
    fontSize: 28,
    marginBottom: 8,
    color: '#1a202c',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#4a5568',
    marginBottom: 20,
    lineHeight: 1.5,
  },
  filePreview: {
    marginBottom: 30,
    border: '1px solid #e2e8f0',
    borderRadius: 8,
    overflow: 'hidden',
  },
  filePreviewContent: {
    flexDirection: 'row',
  },
  filePreviewImage: {
    width: '25%',
    height: 200,
  },
  filePreviewInfo: {
    padding: 20,
    width: '75%',
  },
  fileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1a202c',
  },
  fileDescription: {
    fontSize: 12,
    color: '#4a5568',
    marginBottom: 20,
    lineHeight: 1.5,
  },
  section: {
    marginBottom: 30,
    breakInside: 'avoid',
  },
  sectionTitle: {
    fontSize: 22,
    marginBottom: 15,
    color: '#1a202c',
    fontWeight: 'bold',
    borderBottom: '2px solid #e2e8f0',
    paddingBottom: 8,
  },
  analysisContainer: {
    flexDirection: 'column',
    marginBottom: 30,
  },
  metricsList: {
    width: '100%',
  },
  metricItem: {
    marginBottom: 20,
    padding: 15,
    border: '1px solid #e2e8f0',
    borderRadius: 8,
    breakInside: 'avoid',
  },
  metricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  metricIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  metricTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a202c',
  },
  scoreBar: {
    height: 6,
    backgroundColor: '#e2e8f0',
    borderRadius: 3,
    marginBottom: 8,
  },
  scoreFill: {
    height: '100%',
    borderRadius: 3,
  },
  scoreText: {
    fontSize: 12,
    color: '#4a5568',
    marginBottom: 8,
  },
  feedbackText: {
    fontSize: 12,
    color: '#4a5568',
    lineHeight: 1.5,
  },
  referencesSection: {
    marginTop: 30,
    breakInside: 'avoid',
  },
  referenceType: {
    marginBottom: 20,
    breakInside: 'avoid',
  },
  referenceTypeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a202c',
    marginBottom: 12,
    textTransform: 'capitalize',
  },
  referenceList: {
    marginLeft: 20,
  },
  referenceItem: {
    marginBottom: 15,
  },
  referenceTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#1a202c',
    textTransform: 'capitalize',
  },
  referenceSummary: {
    fontSize: 12,
    color: '#4a5568',
    marginBottom: 5,
    lineHeight: 1.5,
  },
  referenceLink: {
    fontSize: 12,
    color: '#3182ce',
    textDecoration: 'none',
  },
});

const areaConfig = {
  clarity: { name: "Clarity & Structure", color: "#FF6B6B" },
  technical_skills: { name: "Technical Skills", color: "#4ECDC4" },
  innovation: { name: "Innovation", color: "#45B7D1" },
  user_focus: { name: "User Focus", color: "#96CEB4" },
  storytelling: { name: "Storytelling", color: "#D4A5A5" }
};

interface FeedbackPDFProps {
  fileName: string;
  description: string;
  metrics: Areas;
  references: References;
  feedbackImage?: string;
}

export function FeedbackPDF({ fileName, description, metrics, references, feedbackImage }: FeedbackPDFProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Text style={styles.logo}>[tales]</Text>
            <Text style={styles.title}>Your feedback is here!</Text>
          </View>
        </View>

        <View style={styles.filePreview}>
          <View style={styles.filePreviewContent}>
            {feedbackImage && (
              <Image src={feedbackImage} style={styles.filePreviewImage} />
            )}
            <View style={styles.filePreviewInfo}>
              <Text style={styles.fileName}>{fileName}</Text>
              <Text style={styles.fileDescription}>{description}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Areas Analysis</Text>
          <View style={styles.analysisContainer}>
            <View style={styles.metricsList}>
              {Object.entries(metrics).map(([key, value]) => (
                <View key={key} style={styles.metricItem}>
                  <View style={styles.metricHeader}>
                    <View style={[styles.metricIcon, { backgroundColor: areaConfig[key as keyof typeof areaConfig].color }]}>                      
                    </View>
                    <Text style={styles.metricTitle}>
                      {areaConfig[key as keyof typeof areaConfig].name}
                    </Text>
                  </View>
                  <View style={styles.scoreBar}>
                    <View 
                      style={[
                        styles.scoreFill, 
                        { 
                          width: `${value.score * 10}%`,
                          backgroundColor: areaConfig[key as keyof typeof areaConfig].color 
                        }
                      ]} 
                    />
                  </View>
                  <Text style={styles.scoreText}>{value.score}/10</Text>
                  <Text style={styles.feedbackText}>{value.feedback}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.referencesSection}>
          <Text style={styles.sectionTitle}>References</Text>
          {Object.entries(references).map(([type, items]) => (
            <View key={type} style={styles.referenceType}>
              <Text style={styles.referenceTypeTitle}>{type}</Text>
              <View style={styles.referenceList}>
                {items.map((ref: Reference, index: number) => (
                  <View key={`${type}-${index}`} style={styles.referenceItem}>
                    <Text style={styles.referenceTitle}>{ref.title}</Text>
                    <Text style={styles.referenceSummary}>{ref.summary}</Text>
                    <Link src={ref.link} style={styles.referenceLink}>
                      Learn more
                    </Link>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
} 