'use client'

import { useMemo, useRef, useState } from 'react'
import type React from 'react'

type QuestionKind = 'text' | 'textarea' | 'date'

type Question = {
  id: string
  kind: QuestionKind
  required: boolean
  title: string
  placeholder?: string
  hint?: string
  link?: { href: string; label: string }
}

/* — Question definitions — */
const QUESTIONS: Question[] = [
  {
    id: 'name',
    kind: 'text',
    required: true,
    title: '귀하의 성함을 적어주세요',
    placeholder: '예) 홍길동',
  },
  {
    id: 'intro',
    kind: 'textarea',
    required: true,
    title: '귀하가 어떤 사람인지 소개해 주십시오',
    placeholder: '편하게 자신을 소개해 주세요. 어떤 가치관을 가지고 계신지, 어떤 일을 좋아하시는지 등 무엇이든 좋습니다.',
  },
  {
    id: 'birth',
    kind: 'date',
    required: true,
    title: '귀하의 생년월일을 적어주십시오',
  },
  {
    id: 'best',
    kind: 'textarea',
    required: true,
    title: '이전 업무 경험 중 가장 성과가 좋았던 때의 스토리를 알려주십시오',
    placeholder: '편안하게 그때의 이야기를 들려주세요.',
    hint: '어떤 성과가 있었는지, 그 성과는 무엇 때문에 결과가 좋았던 것인지, 그 성과가 자신을 어떻게 변화시켰는지 기술해 주십시오.',
  },
  {
    id: 'weakness',
    kind: 'textarea',
    required: true,
    title: '본인의 단점은 무엇이며, 이를 어떻게 극복하고 있거나 극복할 계획인지 기술해 주십시오',
    placeholder: '솔직하게 작성해 주시면 좋습니다.',
  },
  {
    id: 'motivation',
    kind: 'textarea',
    required: true,
    title: '호원앤컴퍼니에 지원한 이유는 무엇이며 어떤 기여를 할 수 있습니까?',
    placeholder: '지원 동기와 함께, 본인의 어떤 강점을 발휘하실 수 있는지 알려주세요.',
  },
  {
    id: 'feedback',
    kind: 'textarea',
    required: false,
    title: '공개된 당사 정보 중에서 우리가 변경을 해야 하거나 개선을 해야 하는 부분이 있다면 말씀해주십시오',
    placeholder: '편하게 의견을 주세요. 어떤 의견도 환영합니다.',
  },
  {
    id: 'blog',
    kind: 'textarea',
    required: true,
    title: '온라인에 노출된 호원앤컴퍼니의 자사 광고에 대해, 부족하거나 변경해야 할 부분을 검토하고 고견을 주시기 바랍니다',
    placeholder: '블로그 콘텐츠, 광고 카피, 비주얼, 메시지 등 자유롭게 의견을 남겨주세요.',
    link: {
      href: 'https://blog.naver.com/caregn',
      label: '호원앤컴퍼니 블로그 열어보기',
    },
  },
  {
    id: 'seo',
    kind: 'textarea',
    required: true,
    title: '블로그 상위노출을 진행한 경험과 진행할 때 주의하여 진행하고 있는 부분을 알려주십시오',
    placeholder: '상위노출 경험과, 진행 시 특히 주의하시는 부분을 자유롭게 작성해 주세요.',
  },
]

/* — Icons — */
const Icon = {
  Calendar: () => (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>
    </svg>
  ),
  Clock: () => (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>
    </svg>
  ),
  Moon: () => (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 13A9 9 0 1 1 11 3a7 7 0 0 0 10 10z"/>
    </svg>
  ),
  Cup: () => (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 6h12v6a6 6 0 0 1-12 0V6z"/><path d="M17 8h2a2 2 0 0 1 0 4h-2"/><path d="M4 21h14"/>
    </svg>
  ),
  ArrowUp: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17 17 7M9 7h8v8"/>
    </svg>
  ),
  Check: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12.5l4.5 4.5L19 7"/>
    </svg>
  ),
}

/* — Section label — */
function SectionLabel({ num, children }: { num: string; children: React.ReactNode }) {
  return (
    <div className="section-label">
      <span className="section-label__num">{num}</span>
      <span>{children}</span>
      <span className="section-label__line" />
    </div>
  )
}

type EnvCard = {
  tone: 'terra' | 'sage' | 'cream'
  value: string
  unit: string
  label: string
  note: string
  icon: React.ReactNode
}

/* — Environment cards data — */
const ENV_CARDS: EnvCard[] = [
  { tone: 'terra', value: '5', unit: '년', label: '평균 근속',     note: '오래 함께 일합니다',  icon: <Icon.Calendar /> },
  { tone: 'sage',  value: '37', unit: '시간', label: '주 근무 시간', note: '금요일은 오후 4시 퇴근', icon: <Icon.Clock /> },
  { tone: 'cream', value: '거의', unit: '없음', label: '야간 근무',   note: '저녁이 있는 일상',    icon: <Icon.Moon /> },
  { tone: 'cream', value: '강요', unit: '없음', label: '회식 문화',   note: '자율적인 분위기',    icon: <Icon.Cup /> },
]

type Values = Record<string, string>

export default function SurveyPage() {
  const initial = useMemo<Values>(
    () => Object.fromEntries(QUESTIONS.map(q => [q.id, ''])),
    []
  )
  const [values, setValues] = useState<Values>(initial)
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [showErrors, setShowErrors] = useState(false)
  const formRef = useRef<HTMLFormElement | null>(null)

  const setVal = (id: string, v: string) =>
    setValues(prev => ({ ...prev, [id]: v }))

  const requiredQs = QUESTIONS.filter(q => q.required)
  const filledRequired = requiredQs.filter(q => (values[q.id] || '').trim().length > 0).length
  const pct = Math.round((filledRequired / requiredQs.length) * 100)
  const allRequiredDone = filledRequired === requiredQs.length

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!allRequiredDone) {
      setShowErrors(true)
      const firstEmpty = requiredQs.find(q => !(values[q.id] || '').trim())
      if (firstEmpty) {
        const el = document.getElementById('field-' + firstEmpty.id)
        if (el) {
          const top = el.getBoundingClientRect().top + window.pageYOffset - 80
          window.scrollTo({ top, behavior: 'smooth' })
          setTimeout(() => {
            const input = el.querySelector<HTMLInputElement | HTMLTextAreaElement>('input, textarea')
            if (input) input.focus({ preventScroll: true })
          }, 400)
        }
      }
      return
    }

    setSubmitting(true)
    try {
      const payload: Record<string, string> = {}
      QUESTIONS.forEach((q, idx) => {
        const key = `[Q${String(idx + 1).padStart(2, '0')}]`
        const answer = values[q.id] || ''
        payload[key] = `[질문] ${q.title}\n[답변] ${answer}`
      })

      const res = await fetch('https://formspree.io/f/xeollevk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        setDone(true)
      } else {
        alert('제출 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.')
      }
    } catch {
      alert('제출 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.')
    } finally {
      setSubmitting(false)
    }
  }

  const resetAfterDone = () => {
    setDone(false)
    setValues(initial)
    setShowErrors(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="app">
      {/* Sticky progress */}
      <div className="progress-bar" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
        <div className="progress-bar__inner">
          <span className="progress-bar__label">설문 진행률</span>
          <div className="progress-bar__track">
            <div className="progress-bar__fill" style={{ width: pct + '%' }} />
          </div>
          <span className="progress-bar__pct">{pct}%</span>
        </div>
      </div>

      <main className="page">

        {/* Hero */}
        <header className="hero">
          <span className="hero__mark">
            <span className="hero__dot" />
            Pre-Interview Survey
          </span>
          <h1 className="hero__brand">
            호원앤컴퍼니<span className="hero__brand-en"> · Howon &amp; Company</span>
          </h1>
          <p className="hero__sub">지원자 여러분을 한 걸음 더 알아가기 위한 짧은 인사입니다.</p>
          <div className="hero__ornament" />
        </header>

        {/* Intro */}
        <section>
          <SectionLabel num="01">지원자 여러분께</SectionLabel>
          <article className="letter">
            <p className="letter__greeting">반갑습니다, 그리고 감사합니다.</p>
            <p className="letter__body">
              먼저, 저희 <em>호원앤컴퍼니</em>에 소중한 지원서를 보내주셔서 진심으로 감사드립니다.
              <br /><br />
              이 설문은 지원자 여러분의 역량과 강점을 보다 폭넓게 파악하고,
              호원앤컴퍼니와의 적합성을 함께 고민하기 위한 과정입니다.
              성실히 응답해 주시면 채용 과정에 큰 도움이 될 것입니다.
            </p>
            <div className="letter__signoff">
              <span>편안한 마음으로, 천천히 답변해 주세요.</span>
              <strong>채용 담당자 드림</strong>
            </div>

            <div className="tips">
              <div className="tip">
                <span className="tip__icon">✓</span>
                <span>정답은 없습니다. 솔직하고 구체적으로 작성해 주세요.</span>
              </div>
              <div className="tip">
                <span className="tip__icon">?</span>
                <span>궁금하신 점이 있다면 언제든 편하게 문의해 주세요.</span>
              </div>
              <div className="tip">
                <span className="tip__icon">♥</span>
                <span>답변해 주신 모든 정보는 채용 목적으로만 활용됩니다.</span>
              </div>
            </div>
          </article>
        </section>

        {/* Environment */}
        <section className="block">
          <SectionLabel num="02">함께 일하게 될 환경</SectionLabel>
          <div className="env-grid">
            {ENV_CARDS.map((c, i) => (
              <div key={i} className={`env-card env-card--${c.tone}`}>
                <div className="env-card__top">
                  <span className="env-card__tag">0{i + 1}</span>
                  <span className="env-card__pin">{c.icon}</span>
                </div>
                <div className="env-card__value">
                  {c.value}
                  <span className="env-card__value-unit">{c.unit}</span>
                </div>
                <div className="env-card__label">{c.label}</div>
                <div className="env-card__note">{c.note}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Form */}
        <section className="block">
          <SectionLabel num="03">설문</SectionLabel>
          <form className="form" ref={formRef} onSubmit={handleSubmit} noValidate>
            {QUESTIONS.map((q, idx) => {
              const v = values[q.id] || ''
              const filled = v.trim().length > 0
              const isError = showErrors && q.required && !filled
              const num = String(idx + 1).padStart(2, '0')
              return (
                <div
                  key={q.id}
                  id={'field-' + q.id}
                  className={`field${filled ? ' field--done' : ''}${isError ? ' field--error' : ''}`}
                >
                  <div className="field__head">
                    <span className="field__num">{filled ? '✓' : num}</span>
                    <h3 className="field__title">
                      Q{idx + 1}. {q.title}
                      {q.required
                        ? <span className="field__required" aria-label="필수">*</span>
                        : <span className="field__optional">선택</span>}
                    </h3>
                  </div>

                  {q.hint && <p className="field__hint">💡 {q.hint}</p>}

                  {q.link && (
                    <a className="field__link" href={q.link.href} target="_blank" rel="noopener noreferrer">
                      {q.link.label} <Icon.ArrowUp />
                    </a>
                  )}

                  {q.kind === 'text' && (
                    <input
                      className="input"
                      type="text"
                      value={v}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setVal(q.id, e.target.value)}
                      placeholder={q.placeholder}
                      maxLength={60}
                    />
                  )}

                  {q.kind === 'date' && (
                    <input
                      className="input input--date"
                      type="date"
                      value={v}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setVal(q.id, e.target.value)}
                      max="2010-12-31"
                      min="1940-01-01"
                    />
                  )}

                  {q.kind === 'textarea' && (
                    <textarea
                      className="textarea"
                      value={v}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setVal(q.id, e.target.value)}
                      placeholder={q.placeholder}
                      rows={5}
                    />
                  )}

                  {q.kind === 'textarea' && (
                    <div className="field__footer">
                      {isError
                        ? <span className="field__error">필수 항목입니다.</span>
                        : <span>편안한 마음으로 작성해 주세요.</span>}
                      <span className="counter">
                        <strong>{v.length}</strong>자
                      </span>
                    </div>
                  )}

                  {q.kind !== 'textarea' && isError && (
                    <div className="field__footer">
                      <span className="field__error">필수 항목입니다.</span>
                      <span />
                    </div>
                  )}
                </div>
              )
            })}

            {/* Submit */}
            <div className="submit-area">
              <div className="submit-area__line">
                답변해 주셔서 감사합니다.<br />
                아래 버튼을 눌러 제출해 주세요.
              </div>
              <button type="submit" className="submit" disabled={submitting}>
                {submitting
                  ? (<><span className="submit__spinner" /> 제출 중…</>)
                  : '설문 제출하기'}
              </button>
              {showErrors && !allRequiredDone && (
                <div className="submit-help submit-help--warn">
                  필수 항목 {requiredQs.length - filledRequired}개가 비어 있어요.
                </div>
              )}
              {!showErrors && (
                <div className="submit-help">
                  필수 {requiredQs.length}문항 · {filledRequired} / {requiredQs.length} 작성됨
                </div>
              )}
            </div>
          </form>
        </section>

        {/* Footer */}
        <footer className="footer">
          <strong>© 호원앤컴퍼니</strong>
          의료기관 전문 마케팅 컨설팅<br />
          고객 확산 엔진 구축
        </footer>
      </main>

      {/* Modal */}
      {done && (
        <div className="modal-backdrop" onClick={resetAfterDone}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal__check"><Icon.Check /></div>
            <h2 className="modal__title">소중한 답변, 잘 받았습니다.</h2>
            <p className="modal__body">
              {values.name && <><strong style={{ color: 'var(--terra)', fontWeight: 500 }}>{values.name}</strong>님, </>}
              설문을 제출해 주셔서 진심으로 감사드립니다.<br />
              답변은 채용 과정에 소중하게 활용하겠습니다.<br />
              2차 전형에서 합격하게 되면 채용 담당자가 연락드릴것입니다.
            </p>
            <button className="modal__close" onClick={resetAfterDone}>닫기</button>
          </div>
        </div>
      )}
    </div>
  )
}
