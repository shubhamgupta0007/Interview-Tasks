<?php

namespace App\Exports;

use App\Models\UsersListDetails;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class UsersListsDownload implements FromCollection, WithHeadings
{
    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        return UsersListDetails::all();
    }

    public function headings(): array
    {
        return [
            'S.No', 'name', 'email', 'gender', 'address', 'photo', 'phone',
            'created_at',
            'updated_at'
        ];
    }
}
