import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { theme } from '../theme/theme';
import { useUserStore } from '../store/userStore';
import { MapPin, Home, Briefcase, MoreHorizontal, Plus, Check } from 'lucide-react-native';
import { Button } from '../components/common/Button';

export default function AddressScreen() {
  const router = useRouter();
  const { addresses, selectedAddressId, selectAddress } = useUserStore();

  const getIcon = (type: string) => {
    switch (type) {
      case 'HOME': return <Home size={20} color={theme.colors.text} />;
      case 'WORK': return <Briefcase size={20} color={theme.colors.text} />;
      default: return <MapPin size={20} color={theme.colors.text} />;
    }
  };

  const handleSelect = (id: string) => {
    selectAddress(id);
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity style={styles.addNewBtn}>
          <Plus size={20} color={theme.colors.primary} />
          <Text style={styles.addNewText}>Add New Address</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Saved Addresses</Text>

        {addresses.map((address) => (
          <TouchableOpacity
            key={address.id}
            style={[styles.addressCard, selectedAddressId === address.id && styles.selectedCard]}
            onPress={() => handleSelect(address.id)}
          >
            <View style={styles.cardHeader}>
              <View style={styles.typeContainer}>
                {getIcon(address.type)}
                <Text style={styles.typeText}>{address.type}</Text>
              </View>
              {selectedAddressId === address.id && (
                <View style={styles.selectedBadge}>
                  <Check size={12} color={theme.colors.white} />
                </View>
              )}
            </View>

            <Text style={styles.addressDetail}>
              {address.flatNumber}, {address.area}, {address.landmark ? `${address.landmark}, ` : ''}{address.city}, {address.pincode}
            </Text>

            <View style={styles.cardActions}>
              <TouchableOpacity style={styles.actionBtn}>
                <Text style={styles.actionText}>EDIT</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn}>
                <Text style={styles.actionText}>DELETE</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn}>
                <Text style={styles.actionText}>SHARE</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Done"
          onPress={() => router.back()}
          style={styles.doneBtn}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  scrollContent: {
    padding: theme.spacing.lg,
  },
  addNewBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    padding: theme.spacing.lg,
    borderRadius: theme.radius.md,
    marginBottom: theme.spacing.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderStyle: 'dashed',
  },
  addNewText: {
    marginLeft: theme.spacing.md,
    color: theme.colors.primary,
    fontWeight: theme.typography.fontWeight.bold,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.md,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  addressCard: {
    backgroundColor: theme.colors.white,
    padding: theme.spacing.lg,
    borderRadius: theme.radius.md,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  selectedCard: {
    borderColor: theme.colors.primary,
    backgroundColor: '#FFF8F8',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeText: {
    marginLeft: theme.spacing.sm,
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text,
  },
  selectedBadge: {
    backgroundColor: theme.colors.primary,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addressDetail: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    lineHeight: 20,
    marginBottom: theme.spacing.md,
  },
  cardActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingTop: theme.spacing.md,
  },
  actionBtn: {
    marginRight: theme.spacing.xl,
  },
  actionText: {
    fontSize: 12,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary,
  },
  footer: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.white,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  doneBtn: {
    width: '100%',
  }
});
