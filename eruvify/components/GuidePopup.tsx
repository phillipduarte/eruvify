import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  Modal, 
  Linking 
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Theme from '@/constants/Theme';

interface GuidePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

interface GuideItem {
  id: string;
  title: string;
  url: string;
  type: 'video' | 'document';
}

export default function GuidePopup({ isOpen, onClose }: GuidePopupProps) {
  // Video guides
  const videoGuides: GuideItem[] = [
    {
      id: 'v1',
      title: 'How to check an eruv',
      url: 'https://www.youtube.com/watch?v=Ojdu1YDwPdc',
      type: 'video'
    },
    {
      id: 'v2',
      title: 'Understanding eruv boundaries',
      url: 'https://www.youtube.com/watch?v=gPAtbRormZI',
      type: 'video'
    },
    {
      id: 'v3',
      title: 'Rabbi explaining eruv requirements',
      url: 'https://www.youtube.com/watch?v=6RI4wCu4M8I',
      type: 'video'
    }
  ];

  // Text guides
  const textGuides: GuideItem[] = [
    {
      id: 't1',
      title: 'Beginner\'s guide to eruv concepts',
      url: 'https://www.chabad.org/library/article_cdo/aid/815222/jewish/What-Is-an-Eruv.htm',
      type: 'document'
    },
    {
      id: 't2',
      title: 'Modern day eruv construction',
      url: 'https://www.star-k.org/articles/kashrus-kurrents/515/the-modern-day-eruv/',
      type: 'document'
    },
    {
      id: 't3',
      title: 'Halachic requirements for eruvim',
      url: 'https://www.ou.org/life/ritual/laymans_guide_eruv/',
      type: 'document'
    },
    {
      id: 't4',
      title: 'FAQ about eruvim',
      url: 'https://www.myjewishlearning.com/article/eruv/',
      type: 'document'
    }
  ];

  const handleOpenLink = (url: string) => {
    Linking.openURL(url).catch((err) => console.error('Failed to open URL:', err));
  };

  return (
    <Modal
      transparent
      visible={isOpen}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.popup}>
          <View style={styles.header}>
            <Text style={styles.title}>Eruv Guides</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <FontAwesome name="times" size={22} color={Theme.colors.text} />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.content}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Video Guides</Text>
              {videoGuides.map(guide => (
                <TouchableOpacity 
                  key={guide.id}
                  style={styles.guideItem}
                  onPress={() => handleOpenLink(guide.url)}
                >
                  <FontAwesome name="play-circle" size={24} color={Theme.colors.primary} style={styles.guideIcon} />
                  <Text style={styles.guideText}>{guide.title}</Text>
                  <FontAwesome name="external-link" size={16} color={Theme.colors.gray[500]} />
                </TouchableOpacity>
              ))}
            </View>
            
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Text Guides</Text>
              {textGuides.map(guide => (
                <TouchableOpacity 
                  key={guide.id}
                  style={styles.guideItem}
                  onPress={() => handleOpenLink(guide.url)}
                >
                  <FontAwesome name="file-text" size={24} color={Theme.colors.primary} style={styles.guideIcon} />
                  <Text style={styles.guideText}>{guide.title}</Text>
                  <FontAwesome name="external-link" size={16} color={Theme.colors.gray[500]} />
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Theme.spacing.lg,
  },
  popup: {
    backgroundColor: Theme.colors.white,
    borderRadius: Theme.sizes.borderRadius.md,
    width: '100%',
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
    padding: Theme.spacing.md,
  },
  title: {
    fontSize: Theme.typography.fontSize.lg,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: Theme.spacing.xs,
  },
  content: {
    padding: Theme.spacing.md,
  },
  section: {
    marginBottom: Theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: Theme.typography.fontSize.md,
    fontWeight: 'bold',
    marginBottom: Theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.gray[200],
    paddingBottom: Theme.spacing.sm,
  },
  guideItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.gray[200],
  },
  guideIcon: {
    marginRight: Theme.spacing.md,
  },
  guideText: {
    flex: 1,
    fontSize: Theme.typography.fontSize.md,
  },
});