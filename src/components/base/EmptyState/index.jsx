import React from 'react'
import people from '../../../assets/icons/people.png'
import Button from '../Button'
import bigPlus from '../../../assets/icons/big_plus.svg'
import './index.scss'

function EmptyState() {
    return (
        <div className="container_activity_empty">
            <div className='activity_empty_state' data-cy="activity-empty-state">
                <div className='kolom-image'>
                    <div>
                        <img className='img-fluid' src={people} alt="iconMan" />
                    </div>
                </div>
                <div className='kolom-konten'>
                    <div className='frameButton'>
                       <Button className="button_tambah_v2">
                            <div className='icon_plus_2'>
                                <img className='img-fluid' src={bigPlus} alt="icon" />
                            </div>
                        </Button>
                    </div>
                    <p>Buat activity pertamamu</p>
                    <span className='titik'></span>
                     
                </div>
            </div>
        </div>
    )
}

export default EmptyState