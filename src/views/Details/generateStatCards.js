// Material UI icons
import UpIcon from '@material-ui/icons/TrendingUpRounded';
import DownIcon from '@material-ui/icons/TrendingDownRounded';
import OpenIcon from '@material-ui/icons/WorkRounded';
import CloseIcon from '@material-ui/icons/WorkOffRounded';

// Export a function that generates the info cards
export default (theme, latest) => [
  {
    header: 'VOLUMES',
    value: latest.volumes,
  },
  {
    header: 'CURRENT AS AT',
    value: new Date(latest.timestamp).toLocaleDateString(),
  },
  {
    header: 'OPEN',
    value: latest.open,
    colour: theme.palette.info.main,
    Icon: OpenIcon,
  },
  {
    header: 'HIGH',
    value: latest.high,
    colour: theme.palette.success.main,
    Icon: UpIcon,
  },
  {
    header: 'LOW',
    value: latest.low,
    colour: theme.palette.error.main,
    Icon: DownIcon,
  },
  {
    header: 'CLOSE',
    value: latest.close,
    colour: theme.palette.warning.main,
    Icon: CloseIcon,
  },
];
