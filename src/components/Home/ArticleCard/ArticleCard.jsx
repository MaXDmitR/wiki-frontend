import './ArticleCard.scss';

export default function ArticleCard({
  title = 'JavaScript',
  paragraphs = [
    'JavaScript (JS) is a lightweight, interpreted, or just-in-time compiled programming language with first-class functions.',
    'While it is most well-known as the scripting language for Web pages, many non-browser environments also use it, such as Node.js, Apache CouchDB and Adobe Acrobat.',
  ],
  logoSrc = '/js.svg', 
  logoAlt = 'JavaScript logo',
  label = '', 
  date = 'Article publiced 23/05/21'
}) {
  return (
    <article className="article-card container">
      
      {/* 1. ДАТА ПОВИННА БУТИ ТУТ! */}
      <header className="article-card__header">
        {label && <span className="article-card__label" style={{color: '#444', fontSize: '20px'}}>{label}</span>}
        <span className="article-card__date">{date}</span>
      </header>

      <div className="article-card__body">
        
        <div className="article-card__logo-wrapper">
          <img className="article-card__logo" src={logoSrc} alt={logoAlt} />
        </div>

        <div className="article-card__content">
          
          <h2 className="article-card__title">{title}</h2>
          {paragraphs.map((p, i) => (
            <p key={i} className="article-card__text">{p}</p>
          ))}
        </div>

      </div>
    </article>
  );
}