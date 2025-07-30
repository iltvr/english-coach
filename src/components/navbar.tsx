import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { LanguageSwitcher } from './language-switcher';

interface NavbarComponentProps {
  isScrolled: boolean;
}

export const NavbarComponent: React.FC<NavbarComponentProps> = ({ isScrolled }) => {
  const { t } = useTranslation();
  const location = window.location.pathname;
  const isHomePage = location === '/';
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  // Handle navigation with scrolling to section
  const handleNavigation = (sectionId: string) => {
    if (isHomePage) {
      // On homepage, just scroll to the section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // On other pages, navigate to home and then scroll
      navigate('/', { state: { scrollTo: sectionId } });
    }
    setIsMenuOpen(false);
  };

  return (
    <Navbar
      isBlurred={isScrolled}
      className={`transition-all duration-300 ${isScrolled ? 'bg-white/90 shadow-sm' : 'bg-transparent'}`}
      maxWidth="xl"
      isBordered={isScrolled}
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link to="/" className="font-serif text-2xl font-bold text-primary">
            EnglishCoach
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Button
            variant="light"
            className="text-default-700 hover:text-primary transition-colors bg-transparent px-2 py-1 min-w-0"
            onPress={() => handleNavigation('home')}
          >
            {t('navigation.home')}
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            variant="light"
            className="text-default-700 hover:text-primary transition-colors bg-transparent px-2 py-1 min-w-0"
            onPress={() => handleNavigation('about')}
          >
            {t('navigation.about')}
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            variant="light"
            className="text-default-700 hover:text-primary transition-colors bg-transparent px-2 py-1 min-w-0"
            onPress={() => handleNavigation('benefits')}
          >
            {t('navigation.benefits')}
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            variant="light"
            className="text-default-700 hover:text-primary transition-colors bg-transparent px-2 py-1 min-w-0"
            onPress={() => handleNavigation('approach')}
          >
            {t('navigation.approach')}
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            variant="light"
            className="text-default-700 hover:text-primary transition-colors bg-transparent px-2 py-1 min-w-0"
            onPress={() => handleNavigation('testimonials')}
          >
            {t('navigation.testimonials')}
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden sm:flex">
          <LanguageSwitcher />
        </NavbarItem>
        <NavbarItem>
          <Button
            color="primary"
            variant="solid"
            onPress={() => handleNavigation('apply')}
          >
            {t('navigation.apply')}
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {['home', 'about', 'benefits', 'approach'].map((item) => (
          <NavbarMenuItem key={item}>
            <Button
              className="w-full justify-start"
              variant="light"
              onPress={() => handleNavigation(item)}
            >
              {t(`navigation.${item}`)}
            </Button>
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem>
          <LanguageSwitcher />
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
};
