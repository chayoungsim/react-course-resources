import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { createArticle } from '@/api/articles'
import { useAuthStore } from '@/store/authStore'

const schema = z.object({
    title: z.string().min(1, '제목을 입력하세요.'),
    description: z.string().min(1, '한 줄 소개를 입력하세요.'),
    body: z.string().min(1, '본문을 입력하세요.'),
})

type FormValues = z.infer<typeof schema>

const Editor = () => {
    const navigate = useNavigate()
    const { user } = useAuthStore()

    const [tags, setTags] = useState<string[]>([])
    const [tagInput, setTagInput] = useState('')
    const tagInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (!user) navigate('/login')
    }, [user, navigate])

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>({ resolver: zodResolver(schema) })

    const addTag = (value: string) => {
        const trimmed = value.trim().toLowerCase()
        if (trimmed && !tags.includes(trimmed)) {
            setTags((prev) => [...prev, trimmed])
        }
        setTagInput('')
    }

    const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault()
            addTag(tagInput)
        }
        if (e.key === 'Backspace' && tagInput === '' && tags.length > 0) {
            setTags((prev) => prev.slice(0, -1))
        }
    }

    const removeTag = (tag: string) => {
        setTags((prev) => prev.filter((t) => t !== tag))
    }

    const onSubmit = async (values: FormValues) => {
        try {
            const article = await createArticle({ ...values, tagList: tags })
            navigate(`/article/${article.slug}`)
        } catch {
            setError('root', { message: '아티클 발행에 실패했습니다. 다시 시도해주세요.' })
        }
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-10 text-left">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                {errors.root && (
                    <p className="text-[#9e0a0a] text-sm text-center">{errors.root.message}</p>
                )}

                {/* 제목 */}
                <div className="flex flex-col gap-1">
                    <input
                        type="text"
                        className="form-control w-full text-xl py-3"
                        placeholder="Article Title"
                        {...register('title')}
                    />
                    {errors.title && (
                        <p className="text-[#9e0a0a] text-xs">{errors.title.message}</p>
                    )}
                </div>

                {/* 한 줄 소개 */}
                <div className="flex flex-col gap-1">
                    <input
                        type="text"
                        className="form-control w-full"
                        placeholder="What's this article about?"
                        {...register('description')}
                    />
                    {errors.description && (
                        <p className="text-[#9e0a0a] text-xs">{errors.description.message}</p>
                    )}
                </div>

                {/* 본문 */}
                <div className="flex flex-col gap-1">
                    <textarea
                        rows={14}
                        className="form-control w-full resize-y leading-relaxed"
                        placeholder="Write your article (in markdown)"
                        {...register('body')}
                    />
                    {errors.body && (
                        <p className="text-[#9e0a0a] text-xs">{errors.body.message}</p>
                    )}
                </div>

                {/* 태그 입력 */}
                <div className="flex flex-col gap-2">
                    <div
                        className="form-control w-full flex flex-wrap gap-2 cursor-text min-h-[44px]"
                        onClick={() => tagInputRef.current?.focus()}
                    >
                        {tags.map((tag) => (
                            <span
                                key={tag}
                                className="flex items-center gap-1 bg-[#e5e5e0] text-[#211922] text-xs px-2 py-1 rounded-full"
                            >
                                {tag}
                                <button
                                    type="button"
                                    onClick={(e) => { e.stopPropagation(); removeTag(tag) }}
                                    className="hover:text-[#62625b] leading-none"
                                >
                                    ×
                                </button>
                            </span>
                        ))}
                        <input
                            ref={tagInputRef}
                            type="text"
                            className="outline-none flex-1 min-w-[120px] text-sm bg-transparent"
                            placeholder={tags.length === 0 ? 'Enter tags (Enter or , 로 추가)' : ''}
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={handleTagKeyDown}
                            onBlur={() => { if (tagInput) addTag(tagInput) }}
                        />
                    </div>
                </div>

                {/* 발행 버튼 */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-primary lg disabled:opacity-50"
                    >
                        {isSubmitting ? '발행 중...' : 'Publish Article'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Editor
