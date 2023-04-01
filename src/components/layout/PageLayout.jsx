import { FaAngleLeft } from 'react-icons/fa';
import Style from '../../styles/content.module.css';
import { Link } from 'react-router-dom';

const PageLayout = ({
  children,
  backToPrevious,
  backToMenu,
  prevMenu,
  currentMenu,
}) => {
  return (
    <div className={Style.content}>
      {backToPrevious && (
        <div className="flex space-x-1 mb-2">
          <div>
            <Link
              className="flex items-center text-black/[.60] px-1 rounded-md -ml-1 hover:text-black hover:bg-black/[.06]"
              to={-1}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <FaAngleLeft /> Back to Previous
            </Link>
          </div>
        </div>
      )}
      {backToMenu && (
        <div className="flex space-x-0.5">
          <div>
            <Link
              className="text-black/[.60] px-1 rounded-md h-[22px] -ml-1 hover:text-black hover:bg-black/[.06]"
              to={-1}
            >
              {prevMenu}
            </Link>
          </div>
          <div>
            <span className="text-black/[.60] ">/</span>
          </div>
          <div className="text-black/[.60] px-1">{currentMenu}</div>
        </div>
      )}
      {!backToPrevious && !backToMenu && (
        <p className="text-black/[.60] mb-2">{currentMenu}</p>
      )}
      {children}
    </div>
  );
};

export default PageLayout;
