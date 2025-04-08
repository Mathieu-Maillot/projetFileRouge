import React from 'react'
import { renderStars } from '../../components/ui/ratings/Stars';
const Reviews = ({ user, reviews, data }) => {
	return (
		<>
			<div id="reviews">
				<div className="flex column gap1">
					<h1>Mes notes</h1>
					<ul className='flex column gap1 pad1'>
						{reviews?.map((review, index) => {
							const reviewer = data?.users?.find(user => user._id.$oid === review.userId.$oid);

							return (
								<li key={index} className='wrapper_review flex column gap05'>
									<div className="element">
										<p>{reviewer?.firstName} {reviewer?.lastName}</p>
									</div>
									<div className="element">
										<p className='text_color02'>{review?.comment}</p>
									</div>
									<div className="element">
										<p>{renderStars(review?.rating)}</p>
									</div>
									<div className="element">
										<p>{review?.createdAt.$date}</p>
									</div>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		</>
	)
}

export default Reviews