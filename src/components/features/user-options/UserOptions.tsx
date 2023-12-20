import { FC } from 'react'

import { BalanceWalletIcon } from '@/assets/svg/BalanceWalletIcon'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport
} from '@/components/ui/navigation-menu'

import { UserOptionsListItem } from './UserOptionListItem'

export const UserOptions: FC = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem className="">
          <NavigationMenuTrigger className="h-45 rounded-[14px] bg-secondary py-14 pl-15 pr-8 text-secondary-foreground hover:bg-secondary/80">
            <span className="flex items-center gap-x-8">
              <BalanceWalletIcon className="mr-4 h-16 w-16" />
              54fg***42ss
            </span>
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-secondary">
            <NavigationMenuLink asChild>
              <ul className="flex flex-col gap-y-5 p-[10px] lg:w-[250px] md:w-[200px]">
                <UserOptionsListItem href="/docs" title="Introduction">
                  Re-usable components built using Radix UI and Tailwind CSS.
                </UserOptionsListItem>
                <UserOptionsListItem
                  href="/docs/installation"
                  title="Installation"
                >
                  How to install dependencies and structure your app.
                </UserOptionsListItem>
                <UserOptionsListItem
                  href="/docs/primitives/typography"
                  title="Typography"
                >
                  Styles for headings, paragraphs, lists...etc
                </UserOptionsListItem>
              </ul>
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
      <NavigationMenuViewport className="right-0" />
    </NavigationMenu>
  )
}
