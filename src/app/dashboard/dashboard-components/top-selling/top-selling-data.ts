export interface Product {
    image: string,
    uname: string,
    gmail: string,
    productName: string,
    status: string,
    weeks: number,
    budget: string
}

export const TopSelling: Product[] = [

    {
        image: 'assets/images/users/user1.jpg',
        uname: 'Nguyễn Văn An',
        gmail: 'annguyen@gmail.com',
        productName: 'Flexy React',
        status: 'danger',
        weeks: 35,
        budget: '95'
    },
    {
        image: 'assets/images/users/user2.jpg',
        uname: 'Hanna Gover',
        gmail: 'hgover@gmail.com',
        productName: 'Landing pro React',
        status: 'info',
        weeks: 35,
        budget: '84'
    },
    {
        image: 'assets/images/users/user3.jpg',
        uname: 'Hanna Gover',
        gmail: 'hgover@gmail.com',
        productName: 'Elite React	',
        status: 'warning',
        weeks: 35,
        budget: '16'
    }
]