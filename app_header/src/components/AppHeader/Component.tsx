import React from "react";

//router
import {
  Outlet,
  useNavigate,
} from "react-router-dom";

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
  Popover,
  PopoverTrigger,
  PopoverSurface,
  Input,
} from "@fluentui/react-components";
import {
  // Dismiss24Filled,
  bundleIcon,
  ClipboardPasteRegular,
  ClipboardPasteFilled,
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
  Search24Regular,
  AppsList24Regular,
  AppsList24Filled,
  DocumentAdd24Regular,
  DocumentAdd24Filled,
  FolderAdd24Regular,
  FolderAdd24Filled

} from "@fluentui/react-icons";
import styles from './styles.module.scss';

interface HeaderProps {
  count: number;
  // onClear: () => void;
}

//for icon style
const PasteIcon = bundleIcon(ClipboardPasteFilled, ClipboardPasteRegular);
const CopyIcon = bundleIcon(CopyFilled, CopyRegular);
const HomeIcon = bundleIcon(Home24Filled, Home24Regular);
const BoxIcon = bundleIcon(Box24Filled, Box24Regular);
const BoxMultipleIcon = bundleIcon(BoxMultiple24Filled, BoxMultiple24Regular);
const AppListIcon = bundleIcon(AppsList24Filled, AppsList24Regular);
const DocumentAddIcon = bundleIcon(DocumentAdd24Filled, DocumentAdd24Regular);
const FolderAddIcon = bundleIcon(FolderAdd24Filled, FolderAdd24Regular);

export function AppHeader({ count,
  // onClear
}: HeaderProps) {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.navbarContainer}>
        <div className={styles.headerSearchContainer}>
          <h1>Logo</h1>
          <Input
            className={styles.searchInputHeader}
            size="large"
            placeholder="Search item or inventory"
            aria-label="Search item or inventory"
            contentBefore={<Search24Regular />} />
        </div>


        <div className={styles.headerIconContainer}>
          <Button
            appearance="subtle"
            shape="circular"
            onClick={() => navigate("/")}
            icon={<HomeIcon />}>Home</Button>
          <Menu>
            <MenuTrigger disableButtonEnhancement>
              <Button
                appearance="subtle"
                shape="circular"
                icon={<BoxIcon />}>Item</Button>
            </MenuTrigger>

            <MenuPopover>
              <MenuList>
                <MenuItem
                  onClick={() => navigate("/items")}
                  icon={<AppListIcon />}>
                  Item List
                </MenuItem>
                <MenuItem
                  icon={<DocumentAddIcon />}>
                  Add Item
                </MenuItem>
                <MenuItem icon={<FolderAddIcon />}>
                  Add from folder
                </MenuItem>
              </MenuList>
            </MenuPopover>
          </Menu>

          <Menu>
            <MenuTrigger disableButtonEnhancement>
              <Button
                appearance="subtle"
                shape="circular"
                icon={<BoxMultipleIcon />}>Inventory</Button>
            </MenuTrigger>

            <MenuPopover>
              <MenuList>
                <MenuItem icon={<AppListIcon />}>
                  Inventory List
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

          <div >
            <Popover withArrow>
              <PopoverTrigger disableButtonEnhancement>
                <div className={styles.avatarWithBadge}>
                  <Avatar size={36}

                    active={count > 0 ? "active" : "unset"}
                    icon={<Cart24Regular />} />
                  <CounterBadge
                    count={count}
                    size="large"
                    shape="circular" />
                </div>
              </PopoverTrigger>

              <PopoverSurface>
                <div>Your cart is empty</div>
                <Button
                  appearance="primary"
                  shape="circular"
                  onClick={() => navigate("/cart")}
                  icon={<Cart24Regular />}>Go to Cart</Button>
              </PopoverSurface>
            </Popover>
          </div>

          <Avatar
            onClick={() => navigate("/user")}
            icon={<Person24Regular />} size={36} />
        </div>
      </div>


      {/* <Button
        icon={<Dismiss24Filled />}
        onClick={onClear}
        size="large"
      >Clear Cart</Button> */}

      <Outlet />
    </>
  );
};