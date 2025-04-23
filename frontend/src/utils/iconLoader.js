/**
 * Icon loader utility to preload icon components
 */
import * as FaIcons from 'react-icons/fa';
import * as BsIcons from 'react-icons/bs';

// Export a function to get icons by name
export const getIcon = (iconName) => {
  if (iconName.startsWith('Fa')) {
    return FaIcons[iconName];
  } else if (iconName.startsWith('Bs')) {
    return BsIcons[iconName];
  }
  return null;
};

// Export the icon collections directly
export { FaIcons, BsIcons };

// Pre-initialize commonly used icons
export const commonIcons = {
  FaList: FaIcons.FaList,
  FaTh: FaIcons.FaTh,
  FaHome: FaIcons.FaHome,
  FaFilter: FaIcons.FaFilter,
  FaTimes: FaIcons.FaTimes,
  FaChevronDown: FaIcons.FaChevronDown,
  FaChevronRight: FaIcons.FaChevronRight,
  FaExchangeAlt: FaIcons.FaExchangeAlt,
  FaHeart: FaIcons.FaHeart,
  FaRegHeart: FaIcons.FaRegHeart,
  FaShoppingCart: FaIcons.FaShoppingCart,
  FaStar: FaIcons.FaStar,
  // BS Icons
  BsGrid3X3GapFill: BsIcons.BsGrid3X3GapFill,
  BsListUl: BsIcons.BsListUl
};

export default {
  getIcon,
  ...commonIcons
}; 