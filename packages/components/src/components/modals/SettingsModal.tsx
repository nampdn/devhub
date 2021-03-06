import React from 'react'
import { ScrollView } from 'react-native'

import { useAnimatedTheme } from '../../hooks/use-animated-theme'
import { useReduxAction } from '../../hooks/use-redux-action'
import { useReduxState } from '../../hooks/use-redux-state'
import * as actions from '../../redux/actions'
import * as selectors from '../../redux/selectors'
import { contentPadding } from '../../styles/variables'
import { ModalColumn } from '../columns/ModalColumn'
import { AppVersion } from '../common/AppVersion'
import { Avatar } from '../common/Avatar'
import { Button } from '../common/Button'
import { Spacer } from '../common/Spacer'
import { useAppLayout } from '../context/LayoutContext'
import { ThemePreference } from '../widgets/ThemePreference'

export interface SettingsModalProps {}

export function SettingsModal() {
  const { sizename } = useAppLayout()

  const theme = useAnimatedTheme()

  const username = useReduxState(selectors.currentUsernameSelector)

  const logout = useReduxAction(actions.logout)

  return (
    <ModalColumn
      columnId="preferences-modal"
      hideCloseButton={sizename === '1-small'}
      iconName="gear"
      title="Preferences"
      right={
        sizename === '1-small' && username ? (
          <Avatar
            backgroundColorLoading={theme.backgroundColor}
            shape="circle"
            size={28}
            username={username}
          />
        ) : (
          undefined
        )
      }
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexGrow: 1,
          padding: contentPadding,
        }}
      >
        <ThemePreference />

        {/* <Spacer height={contentPadding * 2} />

        <View>
          <H2 withMargin>Enterprise</H2>

          <Button
            key="setup-github-enterprise-button"
            analyticsCategory="enterprise"
            analyticsAction="setup"
            analyticsLabel={username}
            analyticsPayload={{ user_id: userId }}
            onPress={() => pushModal({ name: 'SETUP_GITHUB_ENTERPRISE' })}
          >
            Setup GitHub Enterprise
          </Button>
        </View> */}

        <Spacer flex={1} minHeight={contentPadding} />

        <AppVersion />

        <Spacer height={contentPadding} />

        <Button
          key="logout-button"
          analyticsCategory="engagement"
          analyticsAction="logout"
          analyticsLabel=""
          onPress={() => logout()}
        >
          Logout
        </Button>
      </ScrollView>
    </ModalColumn>
  )
}
