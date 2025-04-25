import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Linking, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';
import { router } from 'expo-router';
import Theme from '@/constants/Theme';
import Card from '@/components/ui/Card';

// Define interfaces for guide items
interface VideoGuide {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
}

interface TextGuide {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'document' | 'website' | 'pdf';
}

export default function GuideScreen() {
  // Track which video is currently being played
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  
  // Video guides with YouTube IDs
  const videoGuides: VideoGuide[] = [
    {
      id: 'v1',
      title: 'Understanding the Eruv',
      description: 'An introduction to the concept of an eruv and its importance in Jewish life.',
      youtubeId: 'AOe6F7GADSc'
    },
    {
      id: 'v2',
      title: 'How to Check an Eruv',
      description: 'A practical guide to inspecting and maintaining an eruv boundary.',
      youtubeId: 'Ojdu1YDwPdc'
    },
    {
      id: 'v3',
      title: 'Eruv Boundaries Explained',
      description: 'Learn about the physical requirements and boundaries of a kosher eruv.',
      youtubeId: 'gPAtbRormZI'
    },
    {
      id: 'v4',
      title: 'Rabbi Explaining Eruv Requirements',
      description: 'A detailed explanation of the halachic requirements for eruvim.',
      youtubeId: '6RI4wCu4M8I'
    }
  ];

  // Text guides with URLs
  const textGuides: TextGuide[] = [
    {
      id: 't1',
      title: 'Beginner\'s Guide to Eruv Concepts',
      description: 'A comprehensive introduction to eruv concepts for beginners.',
      url: 'https://www.chabad.org/library/article_cdo/aid/815222/jewish/What-Is-an-Eruv.htm',
      type: 'website'
    },
    {
      id: 't2',
      title: 'Modern Day Eruv Construction',
      description: 'Learn about how eruvs are constructed in contemporary urban environments.',
      url: 'https://www.star-k.org/articles/kashrus-kurrents/515/the-modern-day-eruv/',
      type: 'website'
    },
    {
      id: 't3',
      title: 'Halachic Requirements for Eruvim',
      description: 'Detailed specifications of what makes an eruv kosher according to Jewish law.',
      url: 'https://www.ou.org/life/ritual/laymans_guide_eruv/',
      type: 'website'
    },
    {
      id: 't4',
      title: 'FAQ About Eruvim',
      description: 'Answers to commonly asked questions about eruvs and their usage.',
      url: 'https://www.myjewishlearning.com/article/eruv/',
      type: 'website'
    },
    {
      id: 't5',
      title: 'History of Eruvim in American Cities',
      description: 'Learn about the history and development of eruvs in major US urban centers.',
      url: 'https://www.tabletmag.com/sections/community/articles/a-wire-runs-through-it-the-eruv',
      type: 'website'
    }
  ];

  const handleOpenLink = (url: string) => {
    Linking.openURL(url).catch((err) => console.error('Failed to open URL:', err));
  };
  
  const toggleVideoPlay = (videoId: string) => {
    setActiveVideoId(activeVideoId === videoId ? null : videoId);
  };
  
  // Screen width minus padding for responsive video sizing
  const videoWidth = Dimensions.get('window').width - (Theme.spacing.md * 2);
  const videoHeight = videoWidth * 0.5625; // 16:9 aspect ratio

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Eruv Guides</Text>
      </View>
      
      <ScrollView style={styles.scrollView}>
        <Text style={styles.sectionDescription}>
          Learn about eruvim, how they work, and how to help maintain them with these educational resources.
        </Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Video Guides</Text>
          
          {videoGuides.map(video => (
            <Card key={video.id} style={styles.videoCard}>
              <Text style={styles.videoTitle}>{video.title}</Text>
              <Text style={styles.videoDescription}>{video.description}</Text>
              
              {activeVideoId === video.id ? (
                <View style={styles.videoContainer}>
                  <WebView
                    style={styles.webView}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    source={{ uri: `https://www.youtube.com/embed/${video.youtubeId}?autoplay=1` }}
                    allowsFullscreenVideo={true}
                  />
                </View>
              ) : (
                <TouchableOpacity 
                  style={[styles.videoThumbnail, { height: videoHeight }]}
                  onPress={() => toggleVideoPlay(video.id)}
                >
                  <View style={styles.playButtonOverlay}>
                    <FontAwesome name="play-circle" size={60} color="rgba(255,255,255,0.8)" />
                  </View>
                  <View style={styles.thumbnailImageContainer}>
                    {/* YouTube thumbnail */}
                    <WebView
                      style={styles.thumbnailImage}
                      source={{ uri: `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg` }}
                      scrollEnabled={false}
                      pointerEvents="none"
                    />
                  </View>
                </TouchableOpacity>
              )}
              
              <View style={styles.videoActions}>
                <TouchableOpacity 
                  style={styles.videoButton}
                  onPress={() => toggleVideoPlay(video.id)}
                >
                  <FontAwesome 
                    name={activeVideoId === video.id ? "pause-circle" : "play-circle"} 
                    size={22} 
                    color={Theme.colors.primary} 
                  />
                  <Text style={styles.videoButtonText}>
                    {activeVideoId === video.id ? "Pause" : "Play"}
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.videoButton}
                  onPress={() => handleOpenLink(`https://www.youtube.com/watch?v=${video.youtubeId}`)}
                >
                  <FontAwesome name="youtube-play" size={22} color="#FF0000" />
                  <Text style={styles.videoButtonText}>Open in YouTube</Text>
                </TouchableOpacity>
              </View>
            </Card>
          ))}
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reading Materials</Text>
          
          {textGuides.map(guide => (
            <Card key={guide.id} style={styles.guideCard}>
              <View style={styles.guideHeader}>
                <View>
                  <Text style={styles.guideTitle}>{guide.title}</Text>
                  <Text style={styles.guideType}>
                    {guide.type === 'document' ? 'Document' : guide.type === 'pdf' ? 'PDF' : 'Website'}
                  </Text>
                </View>
                <FontAwesome 
                  name={
                    guide.type === 'document' ? "file-text" : 
                    guide.type === 'pdf' ? "file-pdf-o" : "globe"
                  } 
                  size={24} 
                  color={Theme.colors.gray[500]} 
                />
              </View>
              
              <Text style={styles.guideDescription}>{guide.description}</Text>
              
              <View style={styles.guideActions}>
                <TouchableOpacity 
                  style={styles.guideButton}
                  onPress={() => handleOpenLink(guide.url)}
                >
                  <FontAwesome name="external-link" size={18} color={Theme.colors.primary} />
                  <Text style={styles.guideButtonText}>Open Resource</Text>
                </TouchableOpacity>
              </View>
            </Card>
          ))}
        </View>
        
        <View style={styles.additionalSection}>
          <Text style={styles.additionalTitle}>Need More Help?</Text>
          <Text style={styles.additionalText}>
            If you need further guidance on understanding or checking your eruv, 
            consider reaching out to a member of the eruv committee or your local rabbi.
          </Text>
          
          <TouchableOpacity 
            style={styles.contactButton}
            onPress={() => router.push('/contact')}
          >
            <FontAwesome name="address-book" size={18} color={Theme.colors.white} />
            <Text style={styles.contactButtonText}>View Contact List</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      
      <View style={styles.bottomBackContainer}>
        <TouchableOpacity 
          style={styles.bottomBackButton}
          onPress={() => router.back()}
        >
          <FontAwesome name="chevron-left" size={16} color={Theme.colors.white} />
          <Text style={styles.bottomBackText}>Return to Previous Screen</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
    paddingHorizontal: Theme.spacing.lg,
  },
  title: {
    fontSize: Theme.typography.fontSize.xl,
    fontWeight: 'bold',
    color: Theme.colors.text,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
    padding: Theme.spacing.md,
  },
  sectionDescription: {
    fontSize: Theme.typography.fontSize.md,
    color: Theme.colors.gray[600],
    marginBottom: Theme.spacing.lg,
    textAlign: 'center',
  },
  section: {
    marginBottom: Theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: Theme.typography.fontSize.lg,
    fontWeight: 'bold',
    marginBottom: Theme.spacing.md,
    color: Theme.colors.text,
  },
  videoCard: {
    marginBottom: Theme.spacing.md,
    padding: Theme.spacing.md,
  },
  videoTitle: {
    fontSize: Theme.typography.fontSize.md,
    fontWeight: 'bold',
    marginBottom: Theme.spacing.xs,
  },
  videoDescription: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.gray[600],
    marginBottom: Theme.spacing.md,
  },
  videoContainer: {
    height: 200,
    marginBottom: Theme.spacing.md,
    borderRadius: Theme.spacing.sm,
    overflow: 'hidden',
  },
  webView: {
    flex: 1,
  },
  videoThumbnail: {
    position: 'relative',
    width: '100%',
    backgroundColor: '#000',
    borderRadius: Theme.spacing.sm,
    marginBottom: Theme.spacing.md,
    overflow: 'hidden',
  },
  thumbnailImageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  thumbnailImage: {
    flex: 1,
  },
  playButtonOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  videoActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: Theme.colors.gray[200],
    paddingTop: Theme.spacing.md,
  },
  videoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.md,
    marginRight: Theme.spacing.md,
  },
  videoButtonText: {
    marginLeft: 8,
    fontSize: Theme.typography.fontSize.md,
    color: Theme.colors.primary,
  },
  guideCard: {
    marginBottom: Theme.spacing.md,
    padding: Theme.spacing.md,
  },
  guideHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Theme.spacing.sm,
  },
  guideTitle: {
    fontSize: Theme.typography.fontSize.md,
    fontWeight: 'bold',
    color: Theme.colors.text,
  },
  guideType: {
    fontSize: Theme.typography.fontSize.xs,
    color: Theme.colors.primary,
    marginTop: 2,
  },
  guideDescription: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.gray[600],
    marginBottom: Theme.spacing.md,
  },
  guideActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: Theme.colors.gray[200],
    paddingTop: Theme.spacing.md,
  },
  guideButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.md,
  },
  guideButtonText: {
    marginLeft: 8,
    fontSize: Theme.typography.fontSize.md,
    color: Theme.colors.primary,
  },
  additionalSection: {
    backgroundColor: Theme.colors.gray[100],
    padding: Theme.spacing.lg,
    borderRadius: Theme.spacing.md,
    marginBottom: Theme.spacing.lg,
    alignItems: 'center',
  },
  additionalTitle: {
    fontSize: Theme.typography.fontSize.lg,
    fontWeight: 'bold',
    marginBottom: Theme.spacing.sm,
    textAlign: 'center',
  },
  additionalText: {
    fontSize: Theme.typography.fontSize.md,
    color: Theme.colors.gray[700],
    textAlign: 'center',
    marginBottom: Theme.spacing.md,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.primary,
    paddingVertical: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.lg,
    borderRadius: Theme.spacing.sm,
  },
  contactButtonText: {
    color: Theme.colors.white,
    marginLeft: 8,
    fontWeight: '500',
  },
  bottomBackContainer: {
    padding: Theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: Theme.colors.gray[200],
  },
  bottomBackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.colors.primary,
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.lg,
    borderRadius: 8,
  },
  bottomBackText: {
    marginLeft: 8,
    fontSize: Theme.typography.fontSize.md,
    color: Theme.colors.white,
    fontWeight: '500',
  },
});