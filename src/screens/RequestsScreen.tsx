import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RequestCard } from '../components/requests/RequestCard';
import { ConfirmModal } from '../components/common/ConfirmModal';
import { guestRequests } from '../data/requests';

import { useRequests } from '../context/RequestsContext';

import { colors, fontSize, layout, radius, spacing } from '../constants/theme';

export function RequestsScreen() {
  const insets = useSafeAreaInsets();
  const { doNotDisturb, housekeeping, setDoNotDisturb, setHousekeeping } =
    useRequests();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalIcon, setModalIcon] = useState('✅');
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  const showModal = (icon: string, title: string, message: string) => {
    setModalIcon(icon);
    setModalTitle(title);
    setModalMessage(message);
    setModalVisible(true);
  };

  return (
    <ScrollView
      style={styles.RequestsScreenChassis}
      contentContainerStyle={[
        styles.RequestsScreenScroll,
        {
          paddingTop: insets.top + spacing.l,
          paddingBottom: layout.tabBarHeight + spacing.xl,
        },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.RequestsScreenHeader}>
        <Text style={styles.RequestsScreenTitle}>Guest Requests</Text>
        <Text style={styles.RequestsScreenSubtitle}>
          We're here to help around the clock
        </Text>
      </View>

      <View style={styles.RequestsScreenControlCard}>
        <View style={styles.RequestsScreenControlRow}>
          <View style={styles.RequestsScreenControlInfo}>
            <Text style={styles.RequestsScreenControlLabel}>
              🔕 Do Not Disturb
            </Text>
            <Text style={styles.RequestsScreenControlDesc}>
              No staff visits until deactivated
            </Text>
          </View>
          <Switch
            value={doNotDisturb}
            onValueChange={setDoNotDisturb}
            trackColor={{ false: colors.divider, true: colors.primaryGold }}
            thumbColor={colors.textPrimary}
          />
        </View>

        <View style={styles.RequestsScreenDivider} />

        <View style={styles.RequestsScreenControlRow}>
          <View style={styles.RequestsScreenControlInfo}>
            <Text style={styles.RequestsScreenControlLabel}>
              🧹 Housekeeping
            </Text>
            <Text style={styles.RequestsScreenControlDesc}>
              Request room cleaning service
            </Text>
          </View>
          <Switch
            value={housekeeping}
            onValueChange={setHousekeeping}
            trackColor={{ false: colors.divider, true: colors.primaryGold }}
            thumbColor={colors.textPrimary}
          />
        </View>

        <View style={styles.RequestsScreenDivider} />

        <TouchableOpacity
          style={styles.RequestsScreenControlRow}
          onPress={() =>
            showModal(
              '🚪',
              'Request Sent',
              'Room access assistance has been requested. Our team will be with you shortly.',
            )
          }
          activeOpacity={0.75}
        >
          <View style={styles.RequestsScreenControlInfo}>
            <Text style={styles.RequestsScreenControlLabel}>
              🚪 Room Access Issue
            </Text>
            <Text style={styles.RequestsScreenControlDesc}>
              Contact front desk for assistance
            </Text>
          </View>
          <Text style={styles.RequestsScreenControlChevron}>›</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.RequestsScreenSectionTitle}>Request Items</Text>
      <View style={styles.RequestsScreenList}>
        {guestRequests.map(req => (
          <RequestCard
            key={req.id}
            request={req}
            onSend={() =>
              showModal(
                '✅',
                'Request Sent',
                "Your request has been sent. We'll deliver it to your room shortly.",
              )
            }
          />
        ))}
      </View>

      <ConfirmModal
        visible={modalVisible}
        icon={modalIcon}
        title={modalTitle}
        message={modalMessage}
        onClose={() => setModalVisible(false)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  RequestsScreenChassis: { flex: 1, backgroundColor: colors.background },
  RequestsScreenScroll: {
    paddingHorizontal: layout.screenPadding,
    gap: spacing.xl,
  },
  RequestsScreenHeader: { gap: 4 },

  RequestsScreenTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  RequestsScreenSubtitle: {
    fontSize: fontSize.body,
    color: colors.mutedText,
  },
  RequestsScreenControlCard: {
    backgroundColor: colors.darkCard,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: `${colors.primaryGold}20`,
    overflow: 'hidden',
  },
  RequestsScreenControlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.l,
  },

  RequestsScreenControlInfo: { flex: 1, gap: 3 },
  RequestsScreenControlLabel: {
    fontSize: fontSize.body,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  RequestsScreenControlDesc: {
    fontSize: fontSize.small,
    color: colors.mutedText,
  },
  RequestsScreenControlChevron: {
    fontSize: 22,
    color: colors.mutedText,
  },

  RequestsScreenDivider: {
    height: 1,
    backgroundColor: colors.divider,
    marginHorizontal: spacing.l,
  },

  RequestsScreenSectionTitle: {
    fontSize: fontSize.title,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  RequestsScreenList: { gap: spacing.m },
});
