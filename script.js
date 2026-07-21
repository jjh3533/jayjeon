class PortfolioController {
  constructor() {
    this.state = {
      headerHeight: 120,
      activeLink: 'hero',
      barStyle: {}
    };
    this.init();
  }

  init() {
    window.addEventListener('scroll', () => this.handleScroll());
    this.updateBarPosition();
    window.addEventListener('resize', () => this.updateBarPosition());
  }

  handleScroll() {
    const newHeight = window.scrollY > 100 ? 80 : 120;
    if (newHeight !== this.state.headerHeight) {
      this.state.headerHeight = newHeight;
      document.getElementById('header').style.height = newHeight + 'px';
    }
    this.updateActiveLink();
    this.updateBarPosition();
  }

  updateActiveLink() {
    const sections = document.querySelectorAll('section');
    let activeSection = 'portfolio';
    sections.forEach(section => {
      if (section.offsetTop - 200 <= window.scrollY) {
        activeSection = section.id || activeSection;
      }
    });
    if (activeSection !== this.state.activeLink) {
      this.state.activeLink = activeSection;
    }
  }

  updateBarPosition() {
    const header = document.getElementById('header');
    const nav = document.querySelector('nav');
    const titleDiv = document.querySelector('.brand-name');
    const headerBar = document.getElementById('headerBar');
    const jeonText = document.getElementById('jeonText');
    
    const getBarColor = (activeLink) => {
      switch(activeLink) {
        case 'portfolio': return '#ff5900';
        case 'inspiration': return '#F6D147';
        case 'contact': return '#00aeef';
        default: return '#0c9f5a';
      }
    };
    
    const updateJeonTransform = () => {
      if (jeonText) {
        jeonText.style.transform = this.state.headerHeight === 80 ? 'translateY(-36px) translateX(75px)' : 'translateY(0) translateX(0)';
      }
    };

    const updateNavTransform = () => {
      const navLinks = document.querySelectorAll('.nav-link');
      navLinks.forEach(link => {
        link.style.transform = this.state.headerHeight === 80 ? 'translateY(-20px)' : 'translateY(0)';
      });
    };

    if ((this.state.activeLink === 'hero') && header && titleDiv) {
      const headerRect = header.getBoundingClientRect();
      const titleRect = titleDiv.getBoundingClientRect();
      const extraWidth = this.state.headerHeight === 80 ? 75 : 0;
      
      Object.assign(headerBar.style, {
        left: (titleRect.left - headerRect.left) + 'px',
        width: (titleRect.width + extraWidth) + 'px',
        background: getBarColor(this.state.activeLink)
      });
      updateJeonTransform();
    } else if (header && nav) {
      const activeLink = document.querySelector(`a[href="#${this.state.activeLink}"]`);
      if (activeLink) {
        const headerRect = header.getBoundingClientRect();
        const navRect = nav.getBoundingClientRect();
        const linkRect = activeLink.getBoundingClientRect();
        
        Object.assign(headerBar.style, {
          left: ((navRect.left - headerRect.left) + (linkRect.left - navRect.left)) + 'px',
          width: linkRect.width + 'px',
          background: getBarColor(this.state.activeLink)
        });
      }
    }
    updateNavTransform();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new PortfolioController();
});
