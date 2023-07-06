import React from "react";


//styles
import {
  Button,
  Avatar,
  CounterBadge,
  Menu,
  MenuTrigger,
  MenuList,
  MenuItem,
  MenuPopover,
} from "@fluentui/react-components";
import {
  Dismiss24Filled,
  BriefcaseRegular,
  CalendarLtrRegular,
  ConferenceRoomRegular,
  PeopleTeamRegular,
  PersonCallRegular,
  bundleIcon,
  ClipboardPasteRegular,
  ClipboardPasteFilled,
  CutRegular,
  CutFilled,
  CopyRegular,
  CopyFilled,
  Home24Regular,
  Home24Filled,
  Box24Regular,
  Box24Filled,
  BoxMultiple24Regular,
  BoxMultiple24Filled,
  Person24Regular,
  Cart24Regular,

} from "@fluentui/react-icons";
import styles from './styles.module.scss';

interface HeaderProps {
  count: number;
  onClear: () => void;
}

//for icon style
const PasteIcon = bundleIcon(ClipboardPasteFilled, ClipboardPasteRegular);
const CopyIcon = bundleIcon(CopyFilled, CopyRegular);
const CutIcon = bundleIcon(CutFilled, CutRegular);
const HomeIcon = bundleIcon(Home24Filled, Home24Regular);
const BoxIcon = bundleIcon(Box24Filled, Box24Regular);
const BoxMultipleIcon = bundleIcon(BoxMultiple24Filled, BoxMultiple24Regular);

export function AppHeader({ count, onClear }: HeaderProps) {


  return (
    <>
      <div className={styles.navbarContainer}>
        <h1>Logo</h1>


        <div>
          <Button appearance="subtle" icon={<HomeIcon />}>Home</Button>
          <Menu>
            <MenuTrigger disableButtonEnhancement>
              <Button appearance="subtle" icon={<BoxIcon />}>Item</Button>
            </MenuTrigger>

            <MenuPopover>
              <MenuList>
                <MenuItem
                  icon={<CutIcon />}>
                  Cut
                </MenuItem>
                <MenuItem
                  icon={<CopyIcon />}>
                  Copy
                </MenuItem>
                <MenuItem icon={<PasteIcon />}>
                  Paste
                </MenuItem>
              </MenuList>
            </MenuPopover>
          </Menu>

          <Menu>
            <MenuTrigger disableButtonEnhancement>
              <Button appearance="subtle" icon={<BoxMultipleIcon />}>Inventory</Button>
            </MenuTrigger>

            <MenuPopover>
              <MenuList>
                <MenuItem icon={<CutIcon />}>
                  Cut
                </MenuItem>
                <MenuItem icon={<CopyIcon />}>
                  Copy
                </MenuItem>
                <MenuItem icon={<PasteIcon />}>
                  Paste
                </MenuItem>
              </MenuList>
            </MenuPopover>
          </Menu>
        </div>

        <div className={styles.headerIconContainer}>
          <div className={styles.avatarWithBadge}>
            <Avatar size={36}
              active="active"
              icon={<Cart24Regular />}
              aria-label="Guest" />
            <CounterBadge
              count={count}
              size="large"
              shape="circular" />
          </div>

          <Avatar
            icon={<Person24Regular />}
            aria-label="Group" />
          <Avatar icon={<PeopleTeamRegular />} shape="square" aria-label="Team" />
          <Avatar icon={<PersonCallRegular />} aria-label="Phone Contact" />
          <Avatar icon={<CalendarLtrRegular />} aria-label="Meeting" />
          <Avatar icon={<BriefcaseRegular />} shape="square" aria-label="Tenant" />
          <Avatar icon={<ConferenceRoomRegular />} shape="square" aria-label="Room" />
        </div>
      </div>
      <h1>This is Header</h1>

      <Button
        icon={<Dismiss24Filled />}
        onClick={onClear}
        size="large"
      >Clear Cart</Button>


    </>
  );
};