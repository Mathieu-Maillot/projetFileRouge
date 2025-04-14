import React from 'react'
import { renderStars } from '../../components/ui/ratings/Stars';
import { getFormattedDate } from '../../components/utils/DataHelpers';

const Reviews = ({ user, reviews, data }) => {
	return (
		<>
			<div id="reviews" className='w_100 margin_top08'>
				<div className="flex column gap1">
					<h1>Mes notes</h1>
					<ul className='flex column gap1 pad1'>
						{reviews?.map((review, index) => {
							const reviewer = data?.users?.find(user => user.id === review.userId);

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
										<p>{getFormattedDate(review?.createdAt.$date)}</p>
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