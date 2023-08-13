import Avatar from '../components/avatar'
import Date from '../components/date'
import CoverImage from './cover-image'
import Link from 'next/link'
import {categoriesContain, REPRINT_MARKER} from "../lib/categories";

export default function ReprintPreview({
    title,
    coverImage,
    date,
    excerpt,
    author,
    slug,
    categories,
}) {

    const isReprint = categoriesContain(categories, REPRINT_MARKER);

    return (
        <>
            {isReprint ? (
                <div className="bg-uil-post">
                    <div className="mb-2 xl:mg-5">
                        {coverImage && (
                            <CoverImage title={title} coverImage={coverImage} slug={slug} />
                        )}
                    </div>
                    <div className="mb-3 mx-3">
                        <h3 className="text-4xl font-adriane-text-bold mb-0 leading-snug text-uil-key">
                            <Link href={`/posts/${slug}`}>
                                <a
                                    className="hover:underline"
                                    dangerouslySetInnerHTML={{ __html: title }}
                                ></a>
                            </Link>
                        </h3>
                        <div className="xl:text-lg mb-4 font-adriane-text-italic">
                            <Date dateString={date} />
                        </div>
                        <div
                            className="text-lg leading-relaxed mb-4"
                            dangerouslySetInnerHTML={{ __html: excerpt }}
                        />
                        <Avatar author={author} />
                    </div>
                </div>
            ) : ('')}
        </>
    )
}
