import TruckIcon from '../ui/icons/common/TruckIcon';
import LockIcon from '../ui/icons/common/LockIcon';
import ReturnIcon from '../ui/icons/common/ReturnIcon';
import HeadsetIcon from '../ui/icons/common/HeadsetIcon';
import BadgeCheckIcon from '../ui/icons/common/BadgeCheckIcon';

export const BADGES = [
  { icon: TruckIcon, title: 'Free Shipping', sub: 'On orders over $49' },
  // { icon: LockIcon, title: 'Secure Payment', sub: '256-bit SSL encryption' },
  { icon: LockIcon, title: 'Secure Payment', sub: 'Direct bank transfer' },
  {
    icon: ReturnIcon,
    title: 'Easy Returns',
    sub: '30-day hassle-free returns',
  },
  { icon: HeadsetIcon, title: '24/7 Support', sub: 'Always here to help' },
  {
    icon: BadgeCheckIcon,
    title: 'Verified Products',
    sub: 'Quality guaranteed',
  },
];
