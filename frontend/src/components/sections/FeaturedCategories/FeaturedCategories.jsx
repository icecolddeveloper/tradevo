import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CATEGORY_DATA } from '../../../data/featuredCategory';
import { Link } from 'react-router-dom';
import styles from './FeaturedCategories.module.css';
import ChevronClose from '../../../ui/icons/common/ChevronClose';

function FeaturedCategories() {
  const [activeId, setActiveId] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownLeft, setDropdownLeft] = useState(0);
  const timerRef = useRef();
  const dropdownRef = useRef();

  const activeCategoryObj = CATEGORY_DATA.find(
    (catObj) => catObj.id === activeId,
  );

  /* function move/shift a dropdown horizontally so it appears under the btn the user clicked, 
     but also prevents the dropdown from overflowing outside the main container. 
  */
  function calculateDropdownLeftPosition(e) {
    const isDesktopScreen = window.matchMedia('(min-width: 1020px)').matches;

    if (!isDesktopScreen) return 0;

    const clickedCategoryButton = e.currentTarget;
    const categoryContainer = clickedCategoryButton.closest(
      `.${styles.main__container}`,
    );

    if (!categoryContainer) return 0;

    const containerPosition = categoryContainer.getBoundingClientRect();
    const buttonPosition = clickedCategoryButton.getBoundingClientRect();

    const dropdownWidth = 360;

    const buttonLeftInsideContainer =
      buttonPosition.left - containerPosition.left;

    const maxLeftPosition = Math.max(
      containerPosition.width - dropdownWidth,
      0,
    );

    // Use the button's left position, but never go beyond the maximum allowed left position.
    const dropdownLeftPosition = Math.min(
      buttonLeftInsideContainer,
      maxLeftPosition,
    );

    return dropdownLeftPosition;
  }

  // dropdown show/hide
  const closeDropdown = useCallback(() => {
    setDropdownOpen(false);
    setActiveId(null);
  }, []);

  useEffect(
    function () {
      if (!dropdownOpen) return;
      const scrollYWhenOpened = window.scrollY;

      function handleScroll() {
        if (Math.abs(window.scrollY - scrollYWhenOpened) > 380) {
          closeDropdown();
        }
      }

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    },
    [dropdownOpen, closeDropdown],
  );

  function showDropdown(e, clickedId) {
    const offset = calculateDropdownLeftPosition(e);

    setDropdownOpen(true);
    setActiveId(clickedId);
    setDropdownLeft(offset);
  }

  function handleClick(e, clickedId) {
    if (clickedId === activeId && dropdownOpen) {
      closeDropdown();
    } else {
      showDropdown(e, clickedId);
    }
  }

  // mouse enter & leave
  function cancelClose() {
    clearTimeout(timerRef.current);
  }

  function handleMouseEnter(e, clickedId) {
    cancelClose();
    showDropdown(e, clickedId);
  }

  function scheduleClose() {
    timerRef.current = setTimeout(() => {
      closeDropdown();
    }, 300);
  }

  const dropdownVariants = {
    hidden: { y: -6, scaleY: 0.95, opacity: 0 },
    visible: {
      y: 0,
      scaleY: 1,
      opacity: 1,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
    exit: {
      y: -4,
      scaleY: 0.97,
      opacity: 0,
      transition: { duration: 0.15, ease: 'easeIn' },
    },
  };

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>Browse by category</h2>

          <Link to="/shop" className={styles.view__all}>
            View all →
          </Link>
        </div>

        <div className={styles.main__container} ref={dropdownRef}>
          {/* Category Title */}
          <div className={styles.category__items__container}>
            {CATEGORY_DATA.map((catObj) => (
              <CategoryItem
                key={catObj.id}
                catObj={catObj}
                handleClick={handleClick}
                activeId={activeId}
                dropdownOpen={dropdownOpen}
                handleMouseEnter={handleMouseEnter}
                scheduleClose={scheduleClose}
              />
            ))}
          </div>

          {/* Dropdown */}
          <AnimatePresence>
            {dropdownOpen && activeId && (
              <motion.div
                className={styles.dropdown__wrapper}
                variants={dropdownVariants}
                style={{ left: dropdownLeft }}
                key={activeId}
                initial="hidden"
                animate="visible"
                exit="exit"
                onMouseEnter={cancelClose}
                onMouseLeave={scheduleClose}
              >
                {/* Dropdown Inner */}
                <div className={styles.dropdown__inner}>
                  {/* Dropdown links */}
                  <div className={styles.dropdown__links}>
                    {/* Heading title */}
                    <p className={styles.dropdown__heading}>Subcategories</p>

                    {/* Dropdown links */}
                    {activeCategoryObj.items.map((catItem) => (
                      <DropdownLink key={catItem} catItem={catItem} />
                    ))}
                  </div>

                  {/* Dropdown card */}
                  <div
                    className={styles.dropdown__card}
                    style={{ background: activeCategoryObj.color }}
                  >
                    <div className={styles.dropdown__top}>
                      <p className={styles.dropdown__card__eye}>
                        {activeCategoryObj.label}
                      </p>
                      <p className={styles.dropdown__card__name}>
                        {activeCategoryObj.featured.name}
                      </p>
                      <span className={styles.dropdown__card__badge}>
                        {activeCategoryObj.featured.discount}
                      </span>
                    </div>

                    {/* Link */}
                    <Link to={``} className={styles.dropdown__card__cta}>
                      Shop {activeCategoryObj.label}{' '}
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet illo
          libero nihil dolorum sequi. Illum natus alias laboriosam
          exercitationem quae iusto, voluptatibus voluptatem. Ut distinctio id
          sed? Placeat aliquam iure vitae corporis ea sint assumenda excepturi
          deserunt nihil, commodi nobis hic illum accusamus dolores id magnam?
          Magni ducimus, fugiat similique esse animi eius impedit beatae commodi
          nostrum, facilis exercitationem tempore, eaque iusto nobis molestiae
          itaque numquam quod? Sapiente quod, dolor minus facere ipsa explicabo
          impedit odit tempora magnam libero veniam doloribus molestias porro in
          quam harum maiores deserunt odio vitae? Architecto repellendus
          temporibus fugiat maxime eius cumque ab at qui aspernatur vero,
          debitis, totam praesentium possimus sapiente quasi officiis sint
          deleniti est voluptas aliquam expedita fuga quibusdam. Repellat, neque
          a exercitationem sequi in magni consectetur natus ad dolorem voluptas
          assumenda ea quia doloribus officia quisquam. Maiores nobis
          dignissimos ab perferendis, aut esse, unde quaerat voluptates tempore
          quisquam hic voluptatem error, blanditiis consequatur! Esse amet eum
          ducimus alias impedit voluptatibus dolorum, eius fuga modi tenetur
          labore eaque blanditiis exercitationem natus assumenda repudiandae
          dolorem aut quis earum. Quasi expedita labore et, omnis asperiores
          enim minus distinctio a? Autem dignissimos modi saepe magni molestias
          at iusto recusandae quibusdam temporibus. Fuga id magnam minus
          obcaecati illum rerum, vero corporis dolorem, omnis, voluptatum at
          quod nemo. Dolore exercitationem, soluta, officiis fuga saepe eaque
          minima nemo sit quisquam cumque nostrum aliquid tempora libero aperiam
          non odio eveniet et accusantium magnam quod minus sunt! Enim aperiam
          similique eius ducimus dolore cumque nihil officia aut vitae
          laboriosam. Deserunt ratione sit quia quibusdam quidem, iste
          blanditiis perferendis ullam voluptatum dicta possimus molestias
          commodi necessitatibus praesentium debitis beatae aliquid unde
          asperiores. Aliquid voluptatum sed asperiores doloribus ab amet
          commodi repellat, dolorem illo beatae deleniti eum vel! Eligendi
          facilis, repellendus nihil tenetur ad voluptate. Qui, accusamus
          doloremque. Alias, quaerat facere sed eius tempora voluptatum maiores
          blanditiis accusamus. Accusamus consequuntur ipsam fugiat ipsa est
          sint nulla eveniet doloribus adipisci laboriosam, aut harum, modi
          beatae possimus corporis facilis animi hic? Repudiandae dolorem
          laboriosam quia consectetur dolorum aut magni a distinctio ut ea
          maiores fuga recusandae cupiditate minus natus facere, voluptatum,
          deleniti sapiente voluptatibus nihil mollitia possimus? Vel quibusdam
          distinctio magnam et corporis fuga delectus, nisi sint voluptate
          ducimus amet ex inventore placeat accusantium, at a facilis? Non vel
          ea animi ullam facilis magni soluta in tempora nemo sit numquam quam
          distinctio, nostrum similique blanditiis, amet repudiandae aliquam
          atque, dicta dignissimos inventore quaerat molestiae delectus rerum!
          Impedit dolores culpa quae libero enim aliquam iusto dignissimos
          sapiente. Sit, tempora itaque inventore distinctio dolore quod. Quia,
          ea, cupiditate similique, labore impedit ab magni quo quidem illum
          eaque quas laborum commodi quasi repellendus quibusdam dolores
          accusamus numquam explicabo rerum minima. Nobis accusantium reiciendis
          consequatur voluptatum mollitia sapiente, temporibus repellat sequi
          totam quibusdam similique dolore ipsum consectetur asperiores fugit
          corrupti non. Praesentium eum delectus nemo explicabo! Praesentium
          laborum necessitatibus minus consectetur! Quos beatae, officia sequi
          provident, cumque quibusdam aliquam debitis maxime quam fugit
          necessitatibus voluptatum! Dignissimos ad id aliquam consectetur totam
          vel delectus obcaecati, mollitia repellendus, omnis deleniti.
          Molestias officiis exercitationem ullam dolores id! Ad mollitia
          facilis cupiditate nulla unde consequatur eum similique! Odit
          repellendus vitae praesentium expedita, nulla nobis hic architecto
          beatae cumque ducimus qui! Debitis aperiam odit ut laborum, eius ipsum
          commodi quis fugit exercitationem sequi voluptatibus, quo iusto
          dolorem neque blanditiis? Vel sint itaque provident saepe autem
          tempore eaque iure corporis. Exercitationem id autem quasi cum vel et
          quidem quisquam aut doloremque earum quae suscipit illum nam dicta
          fugit, iste incidunt! Consequuntur est quos dolore distinctio esse
          voluptate incidunt itaque quas unde! Nesciunt iure sapiente, eligendi
          error dolorem recusandae quaerat! Natus possimus ut illo atque
          consequuntur aliquid nostrum cumque autem mollitia sint quidem iste
          doloribus, debitis neque accusantium animi voluptatem, quam quod
          quasi. Tempora laboriosam, est soluta nisi officiis libero explicabo,
          quos fugiat sapiente sed eligendi consequuntur inventore! Minus
          explicabo unde perspiciatis! Dolore quae libero aspernatur repudiandae
          sed blanditiis error laboriosam at praesentium impedit delectus, id
          quasi neque, nam vitae dicta voluptatum alias excepturi explicabo
          voluptas consequatur ducimus consectetur doloribus sapiente. Impedit,
          distinctio dolore qui corporis perspiciatis vero ipsa saepe vitae
          fugit commodi assumenda obcaecati error iste a magni placeat. Fugiat,
          modi architecto quia at quidem culpa aperiam maiores nostrum magni
          amet laboriosam et minus exercitationem ab laborum nam voluptas
          itaque, similique repudiandae iste asperiores perferendis unde? Maxime
          eligendi voluptas ipsa explicabo blanditiis, vero quam quo natus,
          nulla temporibus ut at dignissimos sit, nesciunt modi? Provident odio
          architecto incidunt aperiam dolore, illum iusto labore fuga cumque
          fugit ea dignissimos in vitae vel? Ducimus, eaque? Cupiditate nihil
          culpa dolore recusandae ea quidem nulla dolor mollitia illum esse,
          sit, dignissimos tenetur repellendus? Natus aliquid nihil rem
          architecto, dolorum, mollitia modi, cupiditate ipsam molestias error
          veniam explicabo adipisci? Ratione illum voluptate cum ipsum esse quia
          quod, minus animi culpa, nemo ipsam veritatis! Aspernatur accusantium
          officiis harum libero assumenda. Temporibus consequatur, ipsam
          eveniet, praesentium laudantium ullam quod ab soluta eum illo dolore
          laboriosam? Perspiciatis, accusamus possimus officiis, reprehenderit
          nihil mollitia incidunt odio sunt laboriosam excepturi consequatur
          vero delectus veritatis minima, cum alias eaque aperiam inventore
          totam ipsam eligendi ut accusantium obcaecati! Recusandae in
          voluptatum autem, laboriosam corporis, sit commodi debitis, nisi quis
          tempora pariatur? Adipisci repellat voluptatum itaque sunt vel dolore
          quasi quam nostrum, aliquam tempora quo esse vero aperiam, ratione
          deleniti voluptas ex tempore id. Impedit libero dicta quidem facilis
          beatae, eaque corporis fuga facere maiores? Molestias perspiciatis
          quas mollitia culpa reprehenderit, cupiditate corrupti ea ratione
          omnis qui tenetur, est consequuntur saepe laudantium iste earum porro
          eaque. Doloribus distinctio fugit ex harum illo non sit odit dolor
          asperiores quidem, eveniet est quam aliquid! Soluta iure quo voluptate
          quibusdam quod, ducimus libero aliquid culpa atque explicabo sapiente
          omnis adipisci quisquam fuga corrupti earum quam ipsa aperiam deserunt
          vero temporibus eveniet architecto nam? Dolore suscipit magnam
          expedita, harum, esse animi id consequatur sint, ipsam ut repudiandae
          voluptatibus laboriosam veritatis illum officia dolor nemo. Itaque
          quaerat neque beatae fugit corrupti at illum. Atque impedit neque
          rerum soluta ab sapiente aliquam nobis est, ipsam et sequi laborum
          accusamus similique velit laudantium minus.
        </div>
      </div>
    </section>
  );
}

function DropdownLink({ catItem }) {
  return (
    <Link to={`shop/${catItem.id}`} className={styles.dropdown__link}>
      <span className={styles.dropdown__dot}></span>
      {catItem}
    </Link>
  );
}

function CategoryItem({
  catObj,
  handleClick,
  handleMouseEnter,
  scheduleClose,
  activeId,
  dropdownOpen,
}) {
  const IconName = catObj.icon;

  return (
    <button
      className={styles.category__item}
      onClick={(e) => handleClick(e, catObj.id)}
      onMouseEnter={(e) => handleMouseEnter(e, catObj.id)}
      onMouseLeave={scheduleClose}
    >
      <IconName className={styles.category__icon} size={23} />
      <span className={styles.category__label}>{catObj.label}</span>

      <ChevronClose
        size={20}
        className={`${styles.chevron__close__icon} ${catObj.id === activeId ? styles.category__chevron__rotate : ''} ${!dropdownOpen ? styles.category__chevron__restore : ''}`}
      />
    </button>
  );
}

export default FeaturedCategories;
