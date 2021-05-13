import { getSettings } from '../../../settings'

const settings = getSettings()
const { toggleWifiOnClick } = settings.networkWidgetOptions

export const WifiStyles = /* css */ `
.wifi {
  display: flex;
  align-items: center;
  padding: 3px 7px;
  background-color: var(--red);
  border-radius: 2px;
  box-shadow: var(--light-shadow);
  user-select: none;
  opacity: 0.9;
  transition: opacity 160ms var(--transition-easing), transform 160ms var(--transition-easing);
  ${toggleWifiOnClick ? 'cursor: pointer;' : ''}
}
.simple-bar--no-color-in-data .wifi {
  background-color: var(--minor);
}
.wifi:hover {
  ${toggleWifiOnClick ? 'opacity: 1;' : ''}
}
.wifi:active {
  ${toggleWifiOnClick ? 'transform: scale(0.9);' : ''}
}
.wifi__icon {
  width: 14px;
  height: 14px;
  margin-right: 7px;
  fill: var(--main);
  transform: translateZ(0);
}
.simple-bar--no-color-in-data .wifi__icon {
  fill: #fff;
}
`