"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Send, CheckCircle } from "lucide-react"

export default function SurveyPage() {
  const [progress, setProgress] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState({
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
    q6: "",
    q7: "",
    q8: "",
  })

  useEffect(() => {
    calculateProgress()
  }, [formData])

  const calculateProgress = () => {
    const required = ["q1", "q2", "q3", "q4", "q5", "q6", "q8"]
    const completed = required.filter((key) => formData[key as keyof typeof formData].trim() !== "").length
    setProgress(Math.round((completed / required.length) * 100))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("https://formspree.io/f/xeollevk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setShowSuccess(true)
        setTimeout(() => {
          setShowSuccess(false)
          setFormData({
            q1: "",
            q2: "",
            q3: "",
            q4: "",
            q5: "",
            q6: "",
            q7: "",
            q8: "",
          })
        }, 3000)
      }
    } catch (error) {
      console.error("[v0] Form submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Progress Bar - Fixed */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-muted-foreground">설문 진행률</span>
            <span className="text-2xl font-bold text-black tracking-tight">{progress}%</span>
          </div>
          <div className="h-2 bg-border rounded-full overflow-hidden">
            <div className="h-full bg-black transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="pt-32 pb-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-none mb-4">호원앤컴퍼니</h1>
          <p className="text-xl md:text-2xl text-white/70 font-light tracking-wide">
            Howon & Company Pre-Interview Survey
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        {/* Intro Section */}
        <section className="mb-32 grid md:grid-cols-12 gap-12">
          <div className="md:col-span-7">
            <h2 className="text-4xl font-bold mb-8 tracking-tight">지원자 여러분께</h2>
            <div className="space-y-6 text-lg leading-relaxed text-foreground/80">
              <p>먼저, 저희 호원앤컴퍼니에 소중한 지원서를 보내주셔서 진심으로 감사드립니다.</p>
              <p>
                이 설문은 지원자 여러분의 역량과 강점을 보다 폭넓게 파악하고, 호원앤컴퍼니와의 적합성을 함께 고민하기
                위한 과정입니다.
              </p>
              <p>성실히 응답해 주시면 채용 과정에 큰 도움이 될 것입니다.</p>
            </div>

            <div className="mt-12 p-8 bg-white rounded-xl border border-border">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                <span className="w-1 h-6 bg-black rounded-full" />
                설문 작성 안내
              </h3>
              <ul className="space-y-3 text-base text-foreground/80">
                <li className="flex items-start gap-3">
                  <span className="text-black font-bold">•</span>
                  <span>솔직하고 구체적으로 작성해주세요</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-black font-bold">•</span>
                  <span>궁금한 사항은 언제든 문의해주세요</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-black font-bold">•</span>
                  <span>정보는 채용 목적으로만 활용됩니다</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="sticky top-32">
              <h3 className="text-2xl font-bold mb-8 tracking-tight">호원앤컴퍼니 근무 환경</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white border border-border p-6 rounded-xl">
                  <div className="text-5xl font-bold mb-3">👥</div>
                  <div className="text-sm font-medium mb-1 text-muted-foreground">평균 근속</div>
                  <div className="text-3xl font-bold tracking-tight text-black">5년</div>
                </div>
                <div className="bg-white border border-border p-6 rounded-xl">
                  <div className="text-5xl font-bold mb-3">⏰</div>
                  <div className="text-sm font-medium mb-1 text-muted-foreground">주 근무</div>
                  <div className="text-3xl font-bold tracking-tight text-black">37시간</div>
                  <div className="text-xs mt-2 font-medium text-muted-foreground">금요일 4시 퇴근</div>
                </div>
                <div className="bg-white border border-border p-6 rounded-xl">
                  <div className="text-5xl font-bold mb-3">🌙</div>
                  <div className="text-sm font-medium mb-1 text-muted-foreground">야간 근무</div>
                  <div className="text-2xl font-bold tracking-tight text-black">거의 없음</div>
                </div>
                <div className="bg-white border border-border p-6 rounded-xl">
                  <div className="text-5xl font-bold mb-3">🎉</div>
                  <div className="text-sm font-medium mb-1 text-muted-foreground">회식</div>
                  <div className="text-2xl font-bold tracking-tight text-black">강요 없음</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Survey Form */}
        <form onSubmit={handleSubmit} className="space-y-12">
          <div className="bg-white border border-border rounded-2xl p-8 md:p-12 shadow-sm hover:shadow-md transition-shadow">
            <div className="mb-6">
              <span className="inline-block bg-black text-white text-sm font-bold px-3 py-1 rounded-full mb-4">
                질문 1/8
              </span>
              <h3 className="text-3xl font-bold tracking-tight">
                귀하의 성함을 적어주세요
                <span className="text-black ml-2">*</span>
              </h3>
            </div>
            <input
              type="text"
              name="q1"
              value={formData.q1}
              onChange={handleChange}
              required
              placeholder="성함 입력"
              className="w-full h-14 px-6 bg-white border-2 border-border rounded-xl text-lg focus:outline-none focus:border-black transition-all"
            />
          </div>

          {/* Question 2 */}
          <div className="bg-white border border-border rounded-2xl p-8 md:p-12 shadow-sm hover:shadow-md transition-shadow">
            <div className="mb-6">
              <span className="inline-block bg-black text-white text-sm font-bold px-3 py-1 rounded-full mb-4">
                질문 2/8
              </span>
              <h3 className="text-3xl font-bold tracking-tight">
                귀하가 어떤 사람인지 소개해 주십시오
                <span className="text-black ml-2">*</span>
              </h3>
            </div>
            <textarea
              name="q2"
              value={formData.q2}
              onChange={handleChange}
              required
              placeholder="자세한 내용을 입력해주세요..."
              rows={6}
              className="w-full px-6 py-4 bg-white border-2 border-border rounded-xl text-lg focus:outline-none focus:border-black transition-all resize-none"
            />
            <div className="text-right text-sm text-muted-foreground mt-2">{formData.q2.length}자</div>
          </div>

          {/* Question 3 */}
          <div className="bg-white border border-border rounded-2xl p-8 md:p-12 shadow-sm hover:shadow-md transition-shadow">
            <div className="mb-6">
              <span className="inline-block bg-black text-white text-sm font-bold px-3 py-1 rounded-full mb-4">
                질문 3/8
              </span>
              <h3 className="text-3xl font-bold tracking-tight">
                귀하의 생년월일을 적어주십시오
                <span className="text-black ml-2">*</span>
              </h3>
            </div>
            <input
              type="date"
              name="q3"
              value={formData.q3}
              onChange={handleChange}
              required
              className="w-full h-14 px-6 bg-white border-2 border-border rounded-xl text-lg focus:outline-none focus:border-black transition-all"
            />
          </div>

          {/* Question 4 */}
          <div className="bg-white border border-border rounded-2xl p-8 md:p-12 shadow-sm hover:shadow-md transition-shadow">
            <div className="mb-6">
              <span className="inline-block bg-black text-white text-sm font-bold px-3 py-1 rounded-full mb-4">
                질문 4/8
              </span>
              <h3 className="text-3xl font-bold tracking-tight mb-4">
                이전 업무 경험 중 가장 성과가 좋았던 때의 스토리를 알려주십시오
                <span className="text-black ml-2">*</span>
              </h3>
              <p className="text-base text-foreground/70 leading-relaxed">
                어떤 성과가 있었는지, 그 성과는 무엇 때문에 결과가 좋았던 것인지, 그 성과가 자신을 어떻게 변화시켰는지
                기술해 주십시오.
              </p>
            </div>
            <textarea
              name="q4"
              value={formData.q4}
              onChange={handleChange}
              required
              placeholder="자세한 내용을 입력해주세요..."
              rows={8}
              className="w-full px-6 py-4 bg-white border-2 border-border rounded-xl text-lg focus:outline-none focus:border-black transition-all resize-none"
            />
            <div className="text-right text-sm text-muted-foreground mt-2">{formData.q4.length}자</div>
          </div>

          {/* Question 5 */}
          <div className="bg-white border border-border rounded-2xl p-8 md:p-12 shadow-sm hover:shadow-md transition-shadow">
            <div className="mb-6">
              <span className="inline-block bg-black text-white text-sm font-bold px-3 py-1 rounded-full mb-4">
                질문 5/8
              </span>
              <h3 className="text-3xl font-bold tracking-tight">
                본인의 단점은 무엇이며, 이를 어떻게 극복하고 있거나 극복할 계획인지 기술해 주십시오
                <span className="text-black ml-2">*</span>
              </h3>
            </div>
            <textarea
              name="q5"
              value={formData.q5}
              onChange={handleChange}
              required
              placeholder="자세한 내용을 입력해주세요..."
              rows={8}
              className="w-full px-6 py-4 bg-white border-2 border-border rounded-xl text-lg focus:outline-none focus:border-black transition-all resize-none"
            />
            <div className="text-right text-sm text-muted-foreground mt-2">{formData.q5.length}자</div>
          </div>

          {/* Question 6 */}
          <div className="bg-white border border-border rounded-2xl p-8 md:p-12 shadow-sm hover:shadow-md transition-shadow">
            <div className="mb-6">
              <span className="inline-block bg-black text-white text-sm font-bold px-3 py-1 rounded-full mb-4">
                질문 6/8
              </span>
              <h3 className="text-3xl font-bold tracking-tight">
                호원앤컴퍼니에 지원한 이유는 무엇이며 어떤 기여를 할 수 있습니까?
                <span className="text-black ml-2">*</span>
              </h3>
            </div>
            <textarea
              name="q6"
              value={formData.q6}
              onChange={handleChange}
              required
              placeholder="자세한 내용을 입력해주세요..."
              rows={8}
              className="w-full px-6 py-4 bg-white border-2 border-border rounded-xl text-lg focus:outline-none focus:border-black transition-all resize-none"
            />
            <div className="text-right text-sm text-muted-foreground mt-2">{formData.q6.length}자</div>
          </div>

          {/* Question 7 */}
          <div className="bg-white border border-border rounded-2xl p-8 md:p-12 shadow-sm hover:shadow-md transition-shadow">
            <div className="mb-6">
              <span className="inline-block bg-black text-white text-sm font-bold px-3 py-1 rounded-full mb-4">
                질문 7/8
              </span>
              <h3 className="text-3xl font-bold tracking-tight">
                공개된 당사 정보 중에서 우리가 변경을 해야 하거나 개선을 해야 하는 부분이 있다면 말씀해주십시오
              </h3>
            </div>
            <textarea
              name="q7"
              value={formData.q7}
              onChange={handleChange}
              placeholder="자세한 내용을 입력해주세요..."
              rows={8}
              className="w-full px-6 py-4 bg-white border-2 border-border rounded-xl text-lg focus:outline-none focus:border-black transition-all resize-none"
            />
            <div className="text-right text-sm text-muted-foreground mt-2">{formData.q7.length}자</div>
          </div>

          {/* Question 8 */}
          <div className="bg-white border border-border rounded-2xl p-8 md:p-12 shadow-sm hover:shadow-md transition-shadow">
            <div className="mb-6">
              <span className="inline-block bg-black text-white text-sm font-bold px-3 py-1 rounded-full mb-4">
                질문 8/8
              </span>
              <h3 className="text-3xl font-bold tracking-tight mb-4">
                https://blog.naver.com/caregn 는 호원앤컴퍼니의 블로그입니다. 이것을 중심으로 온라인 상에 노출되어 있는 호원앤컴퍼니의 자사 광고에 대해서 부족한 부분이나 변경해야 하는 부분을 확인하고 고견을 주시기 바랍니다.
                <span className="text-black ml-2">*</span>
              </h3>
            </div>
            <textarea
              name="q8"
              value={formData.q8}
              onChange={handleChange}
              required
              placeholder="자세한 내용을 입력해주세요..."
              rows={10}
              className="w-full px-6 py-4 bg-white border-2 border-border rounded-xl text-lg focus:outline-none focus:border-black transition-all resize-none"
            />
            <div className="text-right text-sm text-muted-foreground mt-2">{formData.q8.length}자</div>
          </div>

          <div className="pt-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto min-w-[320px] h-16 bg-black text-white font-bold text-lg rounded-xl flex items-center justify-center gap-3 hover:bg-gray-800 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg hover:shadow-xl"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>제출 중...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>설문 제출하기</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Footer */}
        <footer className="mt-32 pt-12 border-t border-border text-center">
          <p className="text-foreground/70 leading-relaxed">
            © 호원앤컴퍼니
            <br />
            의료기관 전문 마케팅 컨설팅 고객확산 엔진구축
          </p>
        </footer>
      </div>

      {showSuccess && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-2xl p-12 max-w-md w-full text-center shadow-2xl scale-in">
            <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-4">제출 완료!</h2>
            <p className="text-lg text-foreground/70 leading-relaxed">
              설문 응답이 성공적으로 전송되었습니다.
              <br />
              소중한 시간 감사합니다.
            </p>
          </div>
        </div>
      )}
    </main>
  )
}
