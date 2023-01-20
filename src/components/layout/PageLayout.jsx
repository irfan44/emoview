import Style from '../../styles/content.module.css';

const PageLayout = ({ children }) => {
  return <div className={Style.content}>{children}</div>;
};

export default PageLayout;
