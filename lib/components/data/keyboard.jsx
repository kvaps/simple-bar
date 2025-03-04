import * as Uebersicht from 'uebersicht'
import * as DataWidget from './data-widget.jsx'
import * as DataWidgetLoader from './data-widget-loader.jsx'
import * as Icons from '../icons.jsx'
import * as Settings from '../../settings'
import * as Utils from '../../utils'
import useWidgetRefresh from '../../hooks/use-widget-refresh'

export { keyboardStyles as styles } from '../../styles/components/data/keyboard'

const settings = Settings.get()
const { widgets, keyboardWidgetOptions } = settings
const { keyboardWidget } = widgets
const { refreshFrequency } = keyboardWidgetOptions

const DEFAULT_REFRESH_FREQUENCY = 20000
const REFRESH_FREQUENCY = Settings.getRefreshFrequency(refreshFrequency, DEFAULT_REFRESH_FREQUENCY)

export const Widget = () => {
  const [state, setState] = Uebersicht.React.useState()
  const [loading, setLoading] = Uebersicht.React.useState(keyboardWidget)

  const getKeyboard = async () => {
    const keyboard = await Uebersicht.run(
      `defaults read ~/Library/Preferences/com.apple.HIToolbox.plist AppleSelectedInputSources | awk '/KeyboardLayout Name/ {print $4}'`
    )
    setState({ keyboard: Utils.cleanupOutput(keyboard) })
    setLoading(false)
  }

  useWidgetRefresh(keyboardWidget, getKeyboard, REFRESH_FREQUENCY)

  if (loading) return <DataWidgetLoader.Widget className="keyboard" />
  if (!state) return null
  const { keyboard } = state

  if (!keyboard?.length) return null

  const formatedOutput = keyboard.replace("'KeyboardLayout Name' =", '').replace(';', '')

  return (
    <DataWidget.Widget classes="keyboard" Icon={Icons.Keyboard}>
      {formatedOutput}
    </DataWidget.Widget>
  )
}
